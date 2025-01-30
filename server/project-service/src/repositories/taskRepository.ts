
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
    async fetchTasks(projectId: string): Promise<ItaskModel[]> {
      try {
        const projects = await this.model.find({ projectId });
        return projects;
      } catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
      }
    }
}
