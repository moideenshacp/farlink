import BaseRepository from "./baseRepository";
import IuserModel from "../interfaces/IuserModel";
import IuserRepo from "../interfaces/IuserRepository";
import UserModel from "../models/UserModel";
import { FilterQuery } from "mongoose";

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
}
