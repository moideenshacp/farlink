/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEmployee } from "./IemployeeDetails";

export  interface IProject {
    _id:string
    organizationId:string
    projectName: string;
    projectDescription: string;
    startDate:Date
    endDate:Date
    manager:any
    members:IEmployee[]
    status:any,
    priority:any
  }
  
  