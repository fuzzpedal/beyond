interface IWondeDateTime {
  date: string
  timezone_type: number
  timezone: string
}

interface IClass {
  id: string
  mis_id: string
  code: string
  description: string
  subject: string
  alternative: boolean
  priority: boolean
  academic_year: number
  restored_at: IWondeDateTime
  created_at: IWondeDateTime
  updated_at: IWondeDateTime
}

interface ILessonPeriod {
  id:	string
  start_time: string
  end_time: string
  name: string
  day: string
  created_at: IWondeDateTime
  updated_at: IWondeDateTime
}

interface ILesson {
    period: {
        data: ILessonPeriod
    }
}

interface IAdditionalClassData {
    students: {
        data: IStudent[]
    }
    lessons: {
        data: ILesson[]
    }
    & IStudent
}

interface IAdditionalClassDataResponse {
    data: IAdditionalClassData
}

interface IEmployee {
  id: string
  upi: string
  mis_id: string
  title: string
  initials: string | null
  surname: string
  forename: string | null
  middle_names: string | null
  legal_surname: string | null
  legal_forename: string | null
  gender: string
  date_of_birth: IWondeDateTime
  restored_at: IWondeDateTime
  created_at: IWondeDateTime
  updated_at: IWondeDateTime
}

interface IEmployeeResponseWithClasses {
  data: {
    classes: {
        data: IClass[]
    }
    & IEmployee
  }
  meta?: any
}

interface IStudent {
  id: string
  upi: string
  initials: string
  legal_forename: string | null
  legal_surname: string | null
  forename: string
  middle_names: string | null
  mis_id: string
  gender: string | null
  gender_identity: string | null
  surname: string
  title: string | null
  date_of_birth: IWondeDateTime
  restored_at: IWondeDateTime | null
  created_at: IWondeDateTime
  updated_at: IWondeDateTime
}

interface IDayLesson {
  startTime: string
  endTime: string
  studentNames: string[]
}

interface IWeek {
  [day:string]: 
    IDayLesson[]
  
}