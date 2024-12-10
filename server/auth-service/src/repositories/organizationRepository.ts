import BaseRepository from "./baseRepository";
import IorganizationModel from "../interfaces/IorganizationModel";
import IorganizationRepository from "../interfaces/IorganizationRepository";
import OrganizationModel from "../models/OrganizationModel";
import { FilterQuery } from "mongoose";

export class organizationRepository
  extends BaseRepository<IorganizationModel>
  implements IorganizationRepository
{
  constructor() {
    super(OrganizationModel);
  }

  async findByAdminId(adminId: string): Promise<IorganizationModel | null> {
    return this.findOne({ admin: adminId });
  }

  async createOrganization(
    organizationData: Partial<IorganizationModel>
  ): Promise<IorganizationModel | null> {
    return this.save(organizationData);
  }

  async updateOrganization(
    filter: FilterQuery<IorganizationModel>,
    update: Partial<IorganizationModel>
  ): Promise<IorganizationModel | null> {
    return this.model.findOneAndUpdate(filter, update, { new: true });
  }
}
