import { FilterQuery } from "mongoose";
import IuserModel from "./IuserModel";

export default interface IuserRepo {
  findByEmail(email: string): Promise<IuserModel | null>;
  createUser(userData: Partial<IuserModel>): Promise<IuserModel | null>;
  update(
    filter: FilterQuery<IuserModel>,
    update: Partial<IuserModel>
  ): Promise<IuserModel | null>;
  findByEmailWithPopulate(
    email: string,
    populateField: string
  ): Promise<IuserModel | null>;
  findEmployeesByIds(employeeIds: string[]): Promise<IuserModel[]> 
  countEmployeesByOrganization(organizationId: string): Promise<number>
  findByOrganizationId(organizationId: string, page?: number, pageSize?: number): Promise<IuserModel[]> 
}
