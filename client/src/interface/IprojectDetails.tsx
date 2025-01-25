import { IEmployee } from "./IemployeeDetails";

export  interface IProject {
    _id:string
    organizationId:string
    projectName: string;
    projectDescription: string;
    startDate:Date
    endDate:Date
    manager:string
    members:IEmployee[]
  }
  
  