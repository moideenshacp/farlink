import { CustomError } from "../errors/CustomError";
import IsubTaskModel from "../interfaces/IsubTaskModel";
import IsubTaskRepository from "../interfaces/IsubTaskRepository";
import { ItaskDetails } from "../interfaces/ItaskDetails";
import ItaskModel from "../interfaces/ItaskModel";
import ItaskRepository from "../interfaces/ItaskRepository";
import { ItaskService } from "../interfaces/ItaskService";

export class taskService implements ItaskService {
  private _taskRepository: ItaskRepository;
  private _subTaskRepository: IsubTaskRepository;
  constructor(_taskRepository: ItaskRepository,_subTaskRepository: IsubTaskRepository) {
    this._taskRepository = _taskRepository;
    this._subTaskRepository = _subTaskRepository
  }

  async createTask(taskDetails: ItaskDetails): Promise<ItaskModel | null> {
    try {
      console.log(taskDetails, "taskDetails");
      if (new Date(taskDetails.endDate) <= new Date(taskDetails.startDate)) {
        throw new CustomError("End date must be after start date", 400);
      }
      const task = await this._taskRepository.createTask(taskDetails);
      return task;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async fetchTasks(projectId: string): Promise<ItaskModel[] | null> {
    try {
      const result = await this._taskRepository.fetchTasks(projectId);
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
  async updateTask(
    taskId: string,
    taskDetails: ItaskDetails
  ): Promise<ItaskModel | null> {
    try {
      console.log(taskId, taskDetails, "Updating task");
      if (new Date(taskDetails.endDate) <= new Date(taskDetails.startDate)) {
        throw new CustomError("End date must be after start date", 400);
      }
      const updatedtask = await this._taskRepository.updateTask(
        taskId,
        taskDetails
      );

      if (!updatedtask) {
        throw new CustomError("task not found or could not be updated", 404);
      }

      return updatedtask;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }
  async fetchEmployeesTask(
    employeeId: string,
    projectId: string
  ): Promise<ItaskModel[] | null> {
    try {
      console.log(employeeId, "tasks fetching orgId");
      const result = await this._taskRepository.fetchEmployeesTasks(
        projectId,
        employeeId
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
  async fetchAllTasksOfEmployee(
    employeeId: string,
  ): Promise<ItaskModel[] | null> {
    try {
      console.log(employeeId, "tasks fetching orgId");
      const result = await this._taskRepository.fetchAllTasksOfEmployee(
        employeeId
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createSubTask(taskDetails: any): Promise<IsubTaskModel | null> {
    try {
      console.log(taskDetails,"subtask-------------------")
      await this._subTaskRepository.createMultipleTasks(taskDetails)
      return null
    } catch (error) {
      console.log(error);
      throw error
      
    }
  }
}
