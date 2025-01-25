import BaseRepository from "./baseRepository";
import IemployeeModel from "../interfaces/IemployeeModel";
import IemployeeRepo from "../interfaces/IemployeeRepository";
import EmployeeModel from "../models/employeeModel"
import { FilterQuery, Types } from "mongoose";

export class employeeRepository
  extends BaseRepository<IemployeeModel>
  implements IemployeeRepo
{
  static getDistinctOrganizationIds() {
      throw new Error("Method not implemented.");
  }
  constructor() {
    super(EmployeeModel);
  }
  async findByEmail(email: string): Promise<IemployeeModel | null> {
    return this.findOne({ email });
  }

  async createEmployee(employeeData: Partial<IemployeeModel>): Promise<IemployeeModel | null> {
    return this.save(employeeData);
  }
  async findByEmailWithPopulate(email: string, populateField: string): Promise<IemployeeModel | null> {
    return this.model.findOne({ email }).populate(populateField).exec();
  }
  async update(
    filter: FilterQuery<IemployeeModel>,
    update: Partial<IemployeeModel>
  ): Promise<IemployeeModel | null> {
    return this.model.findOneAndUpdate(filter, update, { new: true });
  }
  async findByOrganizationId(organizationId: string): Promise<IemployeeModel[]> {
    const objectId = new Types.ObjectId(organizationId); 
    return this.model.find({ organizationId: objectId }).exec();
  }
  async getDistinctOrganizationIds(): Promise<string[]> {
    return this.model.distinct("organizationId").exec().then(ids => ids.map(id => id.toHexString()));
  }
  async getAllEmployeesByOrganization(
    organizationId: string
  ): Promise<IemployeeModel[]> {
    const objectId = new Types.ObjectId(organizationId);
    return this.model.find({ organizationId: objectId }).exec();
  }
  public async findEmployeesByIds(employeeIds: string[]): Promise<IemployeeModel[]> {
    try {
      console.log(employeeIds,"ellaare id yum repository il und_______________________________________");
      const employees = await this.model.find({ _id: { $in: employeeIds } });
      return employees;
    } catch (error) {
      console.error("Error fetching employees from the database:", error);
      throw error;
    }
  }
}
