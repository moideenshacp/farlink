import BaseRepository from "./baseRepository";
import IsubcriptionModel from "../interfaces/IsubcriptionModel";
import IsubcriptionRepository from "../interfaces/IsubcriptionRepository";
import subcriptionModel from "../models/subcriptionModel"
import { FilterQuery, Types } from "mongoose";

export class subcriptionRepository
  extends BaseRepository<IsubcriptionModel>
  implements IsubcriptionRepository
{
  constructor() {
    super(subcriptionModel);
  }
  async findByEmail(email: string): Promise<IsubcriptionModel | null> {
    return this.findOne({ email });
  }

  async findByEmailWithPopulate(email: string, populateField: string): Promise<IsubcriptionModel | null> {
    return this.model.findOne({ email }).populate(populateField).exec();
  }
  async update(
    filter: FilterQuery<IsubcriptionModel>,
    update: Partial<IsubcriptionModel>
  ): Promise<IsubcriptionModel | null> {
    return this.model.findOneAndUpdate(filter, update, { new: true });
  }
  async findByOrganizationId(organizationId: string): Promise<IsubcriptionModel[]> {
    const objectId = new Types.ObjectId(organizationId); 
    return this.model.find({ organizationId: objectId }).exec();
  }

}
