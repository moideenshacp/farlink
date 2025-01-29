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
      const project = await this._taskRepository.createTask(
        taskDetails
      );
      return project
    } catch (error) {
      console.log(error);
      throw error
    }
  }
}
