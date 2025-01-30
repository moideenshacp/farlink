import { IEmployee } from "./IemployeeDetails";

/* eslint-disable @typescript-eslint/no-explicit-any */

  
  export interface ITaskDetails {
    _id?:string
    taskName: string;
    taskDescription: string;
    startDate: Date | null;
    endDate: Date | null;
    members: IEmployee[];
    priority: any;
    file?: string | File | null;
    organizationId:string | undefined,
    projectId:string 
    status?:any
  }
  