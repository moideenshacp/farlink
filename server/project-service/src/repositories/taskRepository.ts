
import { ItaskDetails } from "../interfaces/ItaskDetails";
import ItaskModel from "../interfaces/ItaskModel";
import ItaskRepository from "../interfaces/ItaskRepository";
import taskModel from "../models/taskModel";
import BaseRepository from "./baseRepository";

export class taskRepository
  extends BaseRepository<ItaskModel>
  implements ItaskRepository
{
  constructor() {
    super(taskModel);
  }
  async createTask(
    taskDetails: ItaskDetails
  ): Promise<ItaskModel | null> {
    return this.save(taskDetails);
  }

}
