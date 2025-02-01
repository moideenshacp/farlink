import { FilterQuery } from "mongoose";
import IleaveModel from "./IleaveModel";

export default interface IleaveRepo {
  createleave(leaveData: Partial<IleaveModel>): Promise<IleaveModel | null>;
  getLeavesTakenInMonth(
    organizationId: string,
    employeeEmail: string,
    leaveType: string,
    month: number,
    year: number
  ): Promise<number>;

  findByEmail(employeeEmail: string): Promise<IleaveModel[]>;
  getApprovedLeavesInDateRange(
    organizationId: string,
    employeeEmail: string,
    startDate: Date,
    endDate: Date,
    leaveId?:string
  ): Promise<IleaveModel[]>;
  updateStatus(
    filter: FilterQuery<IleaveModel>,
    update: Partial<IleaveModel>
  ): Promise<IleaveModel | null>;
  findById(leaveId: string): Promise<IleaveModel | null> 
  updateLeave(leave: IleaveModel): Promise<IleaveModel | null>
}
