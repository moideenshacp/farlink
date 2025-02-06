import IsubTaskModel from "../interfaces/IsubTaskModel";
import IsubTaskRepository from "../interfaces/IsubTaskRepository";
import subTaskModel from "../models/subTaskModel";
import BaseRepository from "./baseRepository";

export class subTaskRepository
  extends BaseRepository<IsubTaskModel>
  implements IsubTaskRepository
{
  constructor() {
    super(subTaskModel);
  }
  async createMultipleTasks(taskDetails: IsubTaskModel[]): Promise<IsubTaskModel[]> {
    try {
      return await subTaskModel.insertMany(taskDetails);
    } catch (error) {
      console.error("Error inserting multiple subtasks:", error);
      throw error;
    }
  }

}
