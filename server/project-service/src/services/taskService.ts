/* eslint-disable @typescript-eslint/no-explicit-any */
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
  ): Promise<IsubTaskModel[] | null> {
    try {
      console.log(employeeId, "tasks fetching orgId");
      const result = await this._subTaskRepository.fetchEmployeesTasks(
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
  ): Promise<IsubTaskModel[] | null> {
    try {
      console.log(employeeId, "tasks fetching orgId");
      const result = await this._subTaskRepository.fetchAllTasksOfEmployee(
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

  async createSubTask(taskDetails: any): Promise<IsubTaskModel[] | null> {
    try {
      console.log(taskDetails,"subtask-------------------")
      const parentTaskId = taskDetails[0]?.parentTaskId;
      console.log("parenttaskId",parentTaskId);
      
      if (!parentTaskId) {
        throw new CustomError("Parent Task ID is required for validation.",400);
      }
      const parentTask = await this._taskRepository.fetchParentTask(parentTaskId)
      console.log("parenttask",parentTask);
      
    if (!parentTask) {
      throw new CustomError("Parent task not found.",400);
    }
    const parentStartDate = new Date(parentTask.startDate);
    const parentEndDate = new Date(parentTask.endDate);
    for (const subtask of taskDetails) {
      const subtaskStartDate = new Date(subtask.startDate);
      const subtaskEndDate = new Date(subtask.endDate);

      if (subtaskStartDate < parentStartDate || subtaskEndDate > parentEndDate) {
        throw new CustomError("Sub task Start-Date and End-Date range should be in between of Main Task",400)
      }
    }
     const result = await this._subTaskRepository.createMultipleTasks(taskDetails)
     if(result){
      return result
     }
      return null
    } catch (error) {
      console.log(error);
      throw error
      
    }
  }
  async updateSubTask(taskId: string, taskDetails: any): Promise<IsubTaskModel | null> {
    try {
      console.log(taskId, taskDetails, "Updating task");
      const parentTaskId = taskDetails?.parentTaskId;
      console.log("parenttaskId",parentTaskId);
      
      if (!parentTaskId) {
        throw new CustomError("Parent Task ID is required for validation.",400);
      }
      const parentTask = await this._taskRepository.fetchParentTask(parentTaskId as string)
      console.log("parenttask",parentTask);
      
    if (!parentTask) {
      throw new CustomError("Parent task not found.",400);
    }
    const parentStartDate = new Date(parentTask.startDate);
    const parentEndDate = new Date(parentTask.endDate);

      const subtaskStartDate = new Date(taskDetails.startDate);
      const subtaskEndDate = new Date(taskDetails.endDate);

      if (subtaskStartDate < parentStartDate || subtaskEndDate > parentEndDate) {
        throw new CustomError("Sub task Start-Date and End-Date range should be in between of Main Task",400)
      }

      taskDetails.members = taskDetails.members._id
    
      const updatedtask = await this._subTaskRepository.updateSubTask(
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
}
