import { FilterQuery } from "mongoose";
import IsubcriptionModel from "./IsubcriptionModel";

export default interface IsubcriptionRepository {
  findByEmail(email: string): Promise<IsubcriptionModel | null>;
  update(
    filter: FilterQuery<IsubcriptionModel>,
    update: Partial<IsubcriptionModel>
  ): Promise<IsubcriptionModel | null>;
}
