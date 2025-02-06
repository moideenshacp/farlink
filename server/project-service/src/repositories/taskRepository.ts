import { CustomError } from "../errors/CustomError";
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
  async createTask(taskDetails: ItaskDetails): Promise<ItaskModel | null> {
    return this.save(taskDetails);
  }
  async fetchTasks(projectId: string): Promise<ItaskModel[]> {
    try {
      const tasks = await this.model.find({ projectId });
      return tasks;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }
  async fetchParentTask(taskId: string): Promise<ItaskModel> {
    try {
      const tasks = await this.model.findById(taskId );
      if (!tasks) {
        throw new CustomError("No tasks found",400)
      }
      return tasks;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }
  async updateTask(
    taskId: string,
    taskDetails: ItaskDetails
  ): Promise<ItaskModel | null> {
    try {
      const updatedTask = await this.model.findByIdAndUpdate(
        taskId,
        { $set: taskDetails },
        { new: true }
      );

      return updatedTask;
    } catch (error) {
      console.error("Error updating Task:", error);
      throw error;
    }
  }
  async fetchEmployeesTasks(
    projectId: string,
    employeeId: string
  ): Promise<ItaskModel[]> {
    try {
      const tasks = await this.model.find({
        projectId,
        $or: [{ members: employeeId }],
      });
      return tasks;
    } catch (error) {
      console.error("Error fetching employee's tasks:", error);
      throw error;
    }
  }
  async fetchAllTasksOfEmployee(
    employeeId: string
  ): Promise<ItaskModel[]> {
    try {
      const tasks = await this.model.find({
        $or: [{ members: employeeId }],
      });
      return tasks;
    } catch (error) {
      console.error("Error fetching employee's tasks:", error);
      throw error;
    }
  }
}
