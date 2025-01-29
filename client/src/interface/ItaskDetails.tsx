/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IMember {
    value: string;
    label: string;
  }
  
  export interface ITaskDetails {
    TaskName: string;
    TaskDescription: string;
    startDate: Date | null;
    endDate: Date | null;
    members: IMember[];
    priority: any;
    file?: string | File | null;
    organizationId:string | undefined,
    projectId:string 
  }
  