export interface Todo {
  title : string,
  description : string,
  duedate : Date,
  publicationDate : Date,

  taskmembers : TaskMember,

  remarks : Remark,

  estimatedWorkTime : Time,
}

interface TaskMember {
  memberId : string,
  name : string,
  status : 'Done' | 'Working' | 'Not started',
  completingTime : Time,
}

interface Time {
  hours : string,
  minutes : string,
  seconds : Date,
}

interface Remark {
  memberId : string,
  name : string,
  comment : string,

  publicationDate : Date,
}
