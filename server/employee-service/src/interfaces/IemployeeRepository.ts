import { FilterQuery } from "mongoose";
import IemployeeModel from "./IemployeeModel";

export default interface IemployeeRepo {
  findByEmail(email: string): Promise<IemployeeModel | null>;
  createEmployee(employeeData: Partial<IemployeeModel>): Promise<IemployeeModel | null>;
  update(
    filter: FilterQuery<IemployeeModel>,
    update: Partial<IemployeeModel>
  ): Promise<IemployeeModel | null>;
  findByEmailWithPopulate(email: string, populateField: string): Promise<IemployeeModel | null>;
  findByOrganizationId(organizationId: string): Promise<IemployeeModel[]>;
}
