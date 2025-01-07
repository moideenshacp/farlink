import { FilterQuery } from "mongoose";
import IAttendanceModel from "../interfaces/IattendenceModel";

export default interface IattendenceRepo {
  findAllSortedByCheckIn(filter: FilterQuery<IAttendanceModel>): Promise<IAttendanceModel[]>;
}
