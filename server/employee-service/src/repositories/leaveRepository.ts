import BaseRepository from "./baseRepository";
import IleaveModel from "../interfaces/IleaveModel";
import leaveModel from "../models/leaveModel";
import IleaveRepo from "../interfaces/IleaveRepository";
import mongoose, { FilterQuery } from "mongoose";

export class leaveRepository
  extends BaseRepository<IleaveModel>
  implements IleaveRepo
{
  constructor() {
    super(leaveModel);
  }

  async createleave(
    leaveData: Partial<IleaveModel>
  ): Promise<IleaveModel | null> {
    return this.save(leaveData);
  }
  async getLeavesTakenInMonth(
    organizationId: string,
    employeeEmail: string,
    leaveType: string,
    month: number,
    year: number
  ): Promise<number> {
    const leaves = await this.model.aggregate([
      {
        $match: {
          organizationId: new mongoose.Types.ObjectId(organizationId),
          employeeEmail,
          leaveType,
          startDate: {
            $gte: new Date(`${year}-${month}-01`),
            $lt: new Date(`${year}-${month + 1}-01`),
          },
          status: "approved" 
        },
      },
      {
        $project: {
          leaveDays: {
            $subtract: [
              { $add: ["$endDate", 1 * 24 * 60 * 60 * 1000] },
              "$startDate",
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalLeaveDays: { $sum: "$leaveDays" },
        },
      },
    ]);

    // Convert milliseconds to days
    const totalLeaveDays = leaves[0]?.totalLeaveDays || 0;
    return Math.ceil(totalLeaveDays / (1000 * 3600 * 24));
  }
  async findByEmail(employeeEmail: string): Promise<IleaveModel[]> {
    return this.model.find({ employeeEmail });
  }

  async updateStatus(
    filter: FilterQuery<IleaveModel>,
    update: Partial<IleaveModel>
  ): Promise<IleaveModel | null> {
    return this.model.findOneAndUpdate(filter, update, { new: true });
  }
  async getApprovedLeavesInDateRange(
    organizationId: string,
    employeeEmail: string,
    startDate: Date,
    endDate: Date
  ): Promise<IleaveModel[]> {
    return this.model.find({
      organizationId: new mongoose.Types.ObjectId(organizationId),
      employeeEmail,
      status: "approved", // Replace "approved" with the actual status used in your schema for approved leaves
      $or: [
        {
          startDate: { $lte: endDate }, // Overlaps when startDate is before or equal to the new leave's endDate
          endDate: { $gte: startDate }, // Overlaps when endDate is after or equal to the new leave's startDate
        },
        {
          startDate: { $gte: startDate, $lte: endDate }, // New leave start is inside the range
        },
        {
          endDate: { $gte: startDate, $lte: endDate }, // New leave end is inside the range
        },
      ],
    });
  }
  
}
