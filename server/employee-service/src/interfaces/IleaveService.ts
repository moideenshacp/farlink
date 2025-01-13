/* eslint-disable @typescript-eslint/no-explicit-any */

import IleaveModel from "./IleaveModel";

export interface IleaveService {

  handleLeaveApplication(data:any): Promise<IleaveModel | null>;
  fetchAppliedLeaves(employeeEmail:string): Promise<IleaveModel[] | null>;
  ManageAppliedLeaves(leaveId:string,status:string): Promise<IleaveModel | null>;


}
