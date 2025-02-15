import BaseRepository from "./baseRepository";
import IuserModel from "../interfaces/IuserModel";
import IuserRepo from "../interfaces/IuserRepository";
import UserModel from "../models/UserModel";
import { FilterQuery, Types } from "mongoose";

export class userRepository
  extends BaseRepository<IuserModel>
  implements IuserRepo
{
  constructor() {
    super(UserModel);
  }
  async findByEmail(email: string): Promise<IuserModel | null> {
    return this.findOne({ email });
  }

  async createUser(userData: Partial<IuserModel>): Promise<IuserModel | null> {
    return this.save(userData);
  }
  async findByEmailWithPopulate(email: string, populateField: string): Promise<IuserModel | null> {
    return this.model.findOne({ email }).populate(populateField).exec();
  }
  async update(
    filter: FilterQuery<IuserModel>,
    update: Partial<IuserModel>
  ): Promise<IuserModel | null> {
    return this.model.findOneAndUpdate(filter, update, { new: true });
  }
   async findEmployeesByIds(employeeIds: string[]): Promise<IuserModel[]> {
    try {
      const employees = await this.model.find({ _id: { $in: employeeIds } });
      return employees;
    } catch (error) {
      console.error("Error fetching employees from the database:", error);
      throw error;
    }
  }
  async countEmployeesByOrganization(organizationId: string): Promise<number> {
    const objectId = new Types.ObjectId(organizationId);
    return this.model.countDocuments({ organizationId: objectId }).exec();
  }
  async findByOrganizationId(organizationId: string, page?: number, pageSize?: number): Promise<IuserModel[]> {
    const objectId = new Types.ObjectId(organizationId);
    let query = this.model.find({ organizationId: objectId });
  
    // Apply pagination only if both page and pageSize exist
    if (page !== undefined && pageSize !== undefined) {
      const skip = (page - 1) * pageSize;
      query = query.skip(skip).limit(pageSize);
    }
  
    return query.exec();
  }
}
