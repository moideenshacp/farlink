/* eslint-disable @typescript-eslint/no-explicit-any */
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
  async createMultipleTasks(
    taskDetails: IsubTaskModel[]
  ): Promise<IsubTaskModel[]> {
    try {
      return await subTaskModel.insertMany(taskDetails);
    } catch (error) {
      console.error("Error inserting multiple subtasks:", error);
      throw error;
    }
  }
  async fetchEmployeesTasks(
    projectId: string,
    employeeId: string
  ): Promise<IsubTaskModel[]> {
    try {
      const tasks = await this.model.find({
        projectId,
        members: employeeId,
      });
      return tasks;
    } catch (error) {
      console.error("Error fetching employee's tasks:", error);
      throw error;
    }
  }
  async updateSubTask(
    taskId: string,
    taskDetails: any
  ): Promise<IsubTaskModel | null> {
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
  async fetchAllTasksOfEmployee(employeeId: string): Promise<IsubTaskModel[]> {
    try {
      const tasks = await this.model.find({
        members: employeeId ,
      });
      return tasks;
    } catch (error) {
      console.error("Error fetching employee's tasks:", error);
      throw error;
    }
  }
  async fetchSubTasksByParentTaskId(parentTaskId: string): Promise<IsubTaskModel[]> {
    try {
      const subTasks = await this.model.find({ parentTaskId });
      return subTasks;
    } catch (error) {
      console.error("Error fetching subtasks by parentTaskId:", error);
      throw error;
    }
  }
  
}
