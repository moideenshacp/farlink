/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatusCode } from "../constants/HttpStatusCode";
import { CustomError } from "../errors/CustomError";
import IprojectRepository from "../interfaces/IprojectRepository";
import IsubTaskModel from "../interfaces/IsubTaskModel";
import IsubTaskRepository from "../interfaces/IsubTaskRepository";
import { ItaskDetails } from "../interfaces/ItaskDetails";
import ItaskModel from "../interfaces/ItaskModel";
import ItaskRepository from "../interfaces/ItaskRepository";
import { ItaskService } from "../interfaces/ItaskService";

export class taskService implements ItaskService {
  private _taskRepository: ItaskRepository;
  private _subTaskRepository: IsubTaskRepository;
  private _projectRepository: IprojectRepository;
  constructor(
    _taskRepository: ItaskRepository,
    _subTaskRepository: IsubTaskRepository,
    _projectRepository: IprojectRepository
  ) {
    this._taskRepository = _taskRepository;
    this._subTaskRepository = _subTaskRepository;
    this._projectRepository = _projectRepository
  }

  async createTask(taskDetails: ItaskDetails): Promise<ItaskModel | null> {
    try {
      const projectDetails =await this._projectRepository.fetchProject(taskDetails.projectId.toString())
      const projectStartDate = new Date(projectDetails.startDate);
      const projectEndDate = new Date(projectDetails.endDate);
      if (
        new Date(taskDetails.startDate) < projectStartDate ||
        new Date(taskDetails.endDate)  > projectEndDate
      ) {
        throw new CustomError(
          "tasks Start-Date and End-Date range should be in between of Project Date",
          HttpStatusCode.BAD_REQUEST
        );
      }
      if (new Date(taskDetails.endDate) <= new Date(taskDetails.startDate)) {
        throw new CustomError("End date must be after start date", HttpStatusCode.BAD_REQUEST);
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
      if (new Date(taskDetails.endDate) <= new Date(taskDetails.startDate)) {
        throw new CustomError("End date must be after start date", HttpStatusCode.BAD_REQUEST);
      }
      const updatedtask = await this._taskRepository.updateTask(
        taskId,
        taskDetails
      );

      if (!updatedtask) {
        throw new CustomError("task not found or could not be updated", HttpStatusCode.NOT_FOUND);
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
      const result = await this._subTaskRepository.fetchEmployeesTasks(
        projectId,
        employeeId
      );
      if (result) {
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
    employeeId: string
  ): Promise<IsubTaskModel[] | null> {
    try {
      const result = await this._subTaskRepository.fetchAllTasksOfEmployee(
        employeeId
      );
      if (result) {
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
      const parentTaskId = taskDetails[0]?.parentTaskId;
      if (!parentTaskId) {
        throw new CustomError(
          "Parent Task ID is required for validation.",
          HttpStatusCode.BAD_REQUEST
        );
      }
      const parentTask = await this._taskRepository.fetchParentTask(
        parentTaskId
      );
      if (!parentTask) {
        throw new CustomError("Parent task not found.", HttpStatusCode.BAD_REQUEST);
      }
      const parentStartDate = new Date(parentTask.startDate);
      const parentEndDate = new Date(parentTask.endDate);
      for (const subtask of taskDetails) {
        const subtaskStartDate = new Date(subtask.startDate);
        const subtaskEndDate = new Date(subtask.endDate);

        if (
          subtaskStartDate < parentStartDate ||
          subtaskEndDate > parentEndDate
        ) {
          throw new CustomError(
            "Sub task Start-Date and End-Date range should be in between of Main Task",
            HttpStatusCode.BAD_REQUEST
          );
        }
      }
      const result = await this._subTaskRepository.createMultipleTasks(
        taskDetails
      );
      if (result) {
        return result;
      }
      return null;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async updateSubTask(
    taskId: string,
    taskDetails: any
  ): Promise<IsubTaskModel | null> {
    try {
      const parentTaskId = taskDetails?.parentTaskId;
      if (parentTaskId) {
        if (!parentTaskId) {
          throw new CustomError(
            "Parent Task ID is required for validation.",
            HttpStatusCode.BAD_REQUEST
          );
        }
        const parentTask = await this._taskRepository.fetchParentTask(
          parentTaskId as string
        );
        if (!parentTask) {
          throw new CustomError("Parent task not found.", HttpStatusCode.BAD_REQUEST);
        }
        const parentStartDate = new Date(parentTask.startDate);
        const parentEndDate = new Date(parentTask.endDate);

        const subtaskStartDate = new Date(taskDetails.startDate);
        const subtaskEndDate = new Date(taskDetails.endDate);

        if (
          subtaskStartDate < parentStartDate ||
          subtaskEndDate > parentEndDate
        ) {
          throw new CustomError(
            "Sub task Start-Date and End-Date range should be in between of Main Task",
            HttpStatusCode.BAD_REQUEST
          );
        }

        taskDetails.members = taskDetails.members[0];
      }
      const updatedtask = await this._subTaskRepository.updateSubTask(
        taskId,
        taskDetails
      );

      if (!updatedtask) {
        throw new CustomError("task not found or could not be updated", HttpStatusCode.NOT_FOUND);
      }

      return updatedtask;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }
  async fetchAllSubTasks(
    parentTaskId: string
  ): Promise<IsubTaskModel[] | null> {
    try {
      const res = await this._subTaskRepository.fetchSubTasksByParentTaskId(
        parentTaskId
      );

      if (res) {
        return res;
      }
      return null;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
