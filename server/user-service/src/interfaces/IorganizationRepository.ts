import IorganizationModel from "./IorganizationModel";
import { FilterQuery } from "mongoose";

export default interface IorganizationRepository {
  findByAdminId(adminId: string): Promise<IorganizationModel | null>;
  createOrganization(
    organizationData: Partial<IorganizationModel>
  ): Promise<IorganizationModel | null>;
  updateOrganization(
    filter: FilterQuery<IorganizationModel>,
    update: Partial<IorganizationModel>
  ): Promise<IorganizationModel | null>;
  findAll(): Promise<IorganizationModel[]>;
}
