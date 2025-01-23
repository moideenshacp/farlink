/* eslint-disable @typescript-eslint/no-unused-vars */
import { Document, Model, FilterQuery } from "mongoose";
import IBaseRepo from "../interfaces/IbaseRepository";

export default class BaseRepository<T extends Document>
  implements IBaseRepo<T>
{
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async save(data: Partial<T>): Promise<T> {
    const newItem = new this.model(data);
    return newItem.save();
  }
  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter);
  }
  async findAll(_filter?: Partial<T> | undefined): Promise<T[]> {
    return this.model.find();
  }
  async findByIdAndUpdate(id: string, update: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, update, { new: true });
  }
  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
