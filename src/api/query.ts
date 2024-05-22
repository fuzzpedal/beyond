import axios from 'axios';
import { API_BASE_URL, AUTH_TOKEN, SCHOOL_ID } from 'react-native-dotenv';

import { storage } from '../storage'
import { IAdditionalClassData, IAdditionalClassDataResponse, ICacheItem, IClass, IDayLesson, IEmployeeResponseWithClasses, IStudent, IWeek, weekDays } from './types';

const jamesBrownId = 'A1248519453';
const CACHE_LIFETIME = 1000 * 60 * 10  // 10 minutes

export const queryApi = async <T>(url: string): Promise<T | Error> => {
  const cacheKey = url;
  const cached = storage.getString(url);
  if (cached) {
    const cacheResult: ICacheItem = JSON.parse(cached);
    const now = new Date().valueOf();
    if (cacheResult.created + CACHE_LIFETIME > now) {
      return cacheResult.data;
    }
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });
    if (response && response.status === 200) {
      const toCache:ICacheItem = {
        created: new Date().valueOf(),
        data: response.data
      }
      storage.set(cacheKey, JSON.stringify(toCache));
      return response.data as T;
    }
    return {
      name: 'Query Error',
      message: 'There was a problem querying the API',
    } as Error;
  } catch (e) {
    return {name: 'Query Error', message: e} as Error;
  }
};

const getClassesByEmployeeId = async (
  employeeId: string,
): Promise<IClass[]> => {
  const url = `${API_BASE_URL}/schools/${SCHOOL_ID}/employees/${employeeId}?include=classes`;
  const result = await queryApi<IEmployeeResponseWithClasses>(url);
  if (result instanceof Error) {
    console.log('ERROR');
    return [];
  }
  return result.data.classes.data;
};

const getAdditionalDataByClassId = async (classId: string): Promise<IAdditionalClassData|undefined> => {
  const url = `${API_BASE_URL}/schools/${SCHOOL_ID}/classes/${classId}?include=students,lessons.period`;
  const result = await queryApi<IAdditionalClassDataResponse>(url);
  if (result instanceof Error) {
    console.log('ERROR');
    return;
  }
  return result.data;
};


export const getWeekPlan = async (): Promise<IWeek> => {
  const week: IWeek = {}
  for (const day of weekDays) {
    week[day] = [];
  }

  const classes = await getClassesByEmployeeId(jamesBrownId);
  for (const class_ of classes) {
    const additionalData = await getAdditionalDataByClassId(class_.id);

    if (additionalData) {
      const studentNames = additionalData.students.data.map((student: IStudent) => `${student.forename} ${student.surname}`);
      const lessons = additionalData.lessons.data;
      for (const lesson of lessons) {
        const day = lesson.period.data.day;
        const lessonStart = lesson.period.data.start_time;
        const lessonEnd = lesson.period.data.end_time;
        if (!Object.keys(week).includes(day)) {
          week[day] = [];
        }
        week[day].push({
          startTime: lessonStart,
          endTime: lessonEnd,
          studentNames: [...studentNames.sort()]
        });
      }
    }
  }

  // sort lessons by start time
  for (const day of weekDays) {
    week[day].sort((a: IDayLesson, b: IDayLesson) => a.startTime > b.startTime ? 1 : -1 );
  }

  return week
};
