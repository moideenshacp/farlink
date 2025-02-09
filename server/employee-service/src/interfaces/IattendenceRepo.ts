import { FilterQuery } from "mongoose";
import IAttendanceModel from "../interfaces/IattendenceModel";

export default interface IattendenceRepo {
  findAllSortedByCheckIn(filter: FilterQuery<IAttendanceModel>): Promise<IAttendanceModel[]>;
  createattendence(attendenceData: Partial<IAttendanceModel>): Promise<IAttendanceModel | null>;
  updateAttendance(
    filter: FilterQuery<IAttendanceModel>,
    updateData: Partial<IAttendanceModel>
  ): Promise<IAttendanceModel | null>;
  findAllByEmployeeEmail(employeeEmail: string): Promise<IAttendanceModel[]>;
  findAttendanceByDate(
    organizationId: string,
    employeeEmail: string,
    date: Date
  ): Promise<IAttendanceModel | null>;
  findById(id: string): Promise<IAttendanceModel | null>
}
