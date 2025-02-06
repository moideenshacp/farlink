/* eslint-disable @typescript-eslint/no-explicit-any */
import IsubTaskModel from "./IsubTaskModel";
import { ItaskDetails } from "./ItaskDetails";
import ItaskModel from "./ItaskModel";

export interface ItaskService {
  createTask(taskDetails: ItaskDetails): Promise<ItaskModel | null>;
  createSubTask(taskDetails: any): Promise<IsubTaskModel[] | null>;
  fetchTasks(projectId: string): Promise<ItaskModel[] | null>;
  updateTask(
    taskId: string,
    taskDetails: ItaskDetails
  ): Promise<ItaskModel | null>;
  fetchEmployeesTask(employeeId:string,projectId:string):Promise<IsubTaskModel[] | null>
  fetchAllTasksOfEmployee(employeeId: string): Promise<IsubTaskModel[] | null>;
  updateSubTask(
    taskId: string,
    taskDetails: any
  ): Promise<IsubTaskModel | null>;
  
}
