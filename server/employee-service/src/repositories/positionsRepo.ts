import BaseRepository from "./baseRepository";
import IpositionModel from "../interfaces/IpositionModel";
import IpositionRepo from "../interfaces/IpositionRepo";
import positionModel from "../models/positionMode";
import mongoose from "mongoose";

export class positionRepository
  extends BaseRepository<IpositionModel>
  implements IpositionRepo
{
  constructor() {
    super(positionModel);
  }

  async createPosition(
    organizationId: mongoose.Types.ObjectId,
    position: string
  ): Promise<IpositionModel | null> {
    const existingRecord = await this.model.findOne({ organizationId });

    if (existingRecord) {
      if (!existingRecord.positions.includes(position)) {
        existingRecord.positions.push(position);
        return existingRecord.save();
      }
      return existingRecord; 
    } else {
      return this.model.create({ organizationId, positions: [position] });
    }
  }
  async findByOrganizationId(organizationId: mongoose.Types.ObjectId): Promise<IpositionModel | null> {
    return this.model.findOne({ organizationId }).exec();
  }
  

}
