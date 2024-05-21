import axios, {Axios, all} from 'axios';
import {AUTH_TOKEN} from 'react-native-dotenv';
import {API_BASE_URL, SCHOOL_ID} from 'react-native-dotenv';

const jamesBrownId = 'A1248519453';

export const queryApi = async <T>(url: string): Promise<T | Error> => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });
    if (response && response.status === 200) {
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


export const getStudentsForWeek = async (): Promise<IWeek> => {
  
  const week: any = {}
  const classes = await getClassesByEmployeeId(jamesBrownId);

    for (const class_ of classes) {
    const additionalData = await getAdditionalDataByClassId(class_.id);

    if (additionalData) {
      const studentNames = additionalData.students.data.map((student: IStudent) => `${student.forename} ${student.surname}`)
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
          studentNames: [...studentNames]
        });

      }
    }
  }
  // console.log(JSON.stringify(week))
  return week
};
