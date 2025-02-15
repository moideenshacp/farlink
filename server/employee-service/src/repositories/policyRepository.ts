import BaseRepository from "./baseRepository";
import mongoose, { FilterQuery } from "mongoose";
import IpolicyRepo from "../interfaces/IpolicyRepo";
import IAttendancePolicy from "../interfaces/IpolicyModel";
import attendencePolicyModel from "../models/attendencePolicyModel";
import IAttendancePolicyModel from "../interfaces/IpolicyModel";

export class AttendancePolicyRepository
  extends BaseRepository<IAttendancePolicy>
  implements IpolicyRepo
{
  constructor() {
    super(attendencePolicyModel);
  }

  async createPolicy(
    policyData: Partial<IAttendancePolicy>
  ): Promise<IAttendancePolicy | null> {
    return this.save(policyData);
  }

  async updatePolicy(
    filter: FilterQuery<IAttendancePolicy>,
    update: Partial<IAttendancePolicy>
  ): Promise<IAttendancePolicy | null> {
    return this.model.findOneAndUpdate(filter, update, { new: true });
  }

  async findByOrganizationId(
    organizationId: mongoose.Types.ObjectId
  ): Promise<IAttendancePolicyModel | null> {
    return this.model.findOne({ organizationId }).exec();
  }
}
