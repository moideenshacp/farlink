import { CustomError } from "../errors/CustomError";
import { ItaskDetails } from "../interfaces/ItaskDetails";
import ItaskModel from "../interfaces/ItaskModel";
import ItaskRepository from "../interfaces/ItaskRepository";
import { ItaskService } from "../interfaces/ItaskService";

export class taskService implements ItaskService {
  private _taskRepository: ItaskRepository;
  constructor(_taskRepository: ItaskRepository) {
    this._taskRepository = _taskRepository;
  }

  async createTask(taskDetails: ItaskDetails): Promise<ItaskModel | null> {
    try {
      console.log(taskDetails, "taskDetails");
      if (
        new Date(taskDetails.endDate) <= new Date(taskDetails.startDate)
      ) {
        throw new CustomError("End date must be after start date", 400);
      }
      const task = await this._taskRepository.createTask(
        taskDetails
      );
      return task
    } catch (error) {
      console.log(error);
      throw error
    }
  }
    async fetchTasks(
      projectId: string
    ): Promise<ItaskModel[] | null> {
      try {
        console.log(projectId, "takss fetching orgId");
        const result = await this._taskRepository.fetchTasks(
          projectId
        );
        if (result) {
          console.log(result, "all Tasks");
          return result;
        } else {
          return null;
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    }
}
