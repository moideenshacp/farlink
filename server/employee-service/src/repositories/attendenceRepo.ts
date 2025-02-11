import { FilterQuery } from "mongoose";
import IAttendanceModel from "../interfaces/IattendenceModel";
import BaseRepository from "./baseRepository";
import IattendenceRepo from "../interfaces/IattendenceRepo";
import attendenceModel from "../models/attendenceModel";

export class AttendanceRepository
  extends BaseRepository<IAttendanceModel>
  implements IattendenceRepo
{
  constructor() {
    super(attendenceModel);
  }

  async findAllSortedByCheckIn(
    filter: FilterQuery<IAttendanceModel>
  ): Promise<IAttendanceModel[]> {
    return this.model.find(filter).sort({ checkIn: -1 }).exec();
  }

  async createattendence(
    attendenceData: Partial<IAttendanceModel>
  ): Promise<IAttendanceModel | null> {
    return this.save(attendenceData);
  }
  async updateAttendance(
    filter: FilterQuery<IAttendanceModel>,
    updateData: Partial<IAttendanceModel>
  ): Promise<IAttendanceModel | null> {
    return this.model.findOneAndUpdate(filter, { $set: updateData }, { new: true }).exec();
  }
  
  async findAllByEmployeeEmail(
    employeeEmail: string
  ): Promise<IAttendanceModel[]> {
    const filter: FilterQuery<IAttendanceModel> = { employeeEmail };
    return this.model.find(filter).sort({ checkIn: -1 }).exec();
  }
  async findAttendanceByDate(
    organizationId: string,
    employeeEmail: string,
    date: Date
  ): Promise<IAttendanceModel | null> {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    return this.model
      .findOne({
        organizationId,
        employeeEmail,
        checkIn: { $gte: startOfDay, $lt: endOfDay },
      })
      .exec();
  }
  async findById(id: string): Promise<IAttendanceModel | null> {
    return this.model.findById(id).exec();
  }
}
