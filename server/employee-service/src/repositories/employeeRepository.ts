import BaseRepository from "./baseRepository";
import IemployeeModel from "../interfaces/IemployeeModel";
import IemployeeRepo from "../interfaces/IemployeeRepository";
import EmployeeModel from "../models/employeeModel"
import { FilterQuery, Types } from "mongoose";

export class employeeRepository
  extends BaseRepository<IemployeeModel>
  implements IemployeeRepo
{
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

}
