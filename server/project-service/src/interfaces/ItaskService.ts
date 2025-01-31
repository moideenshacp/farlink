import { ItaskDetails } from "./ItaskDetails";
import ItaskModel from "./ItaskModel";

export interface ItaskService {
  createTask(taskDetails: ItaskDetails): Promise<ItaskModel | null>;
  fetchTasks(projectId: string): Promise<ItaskModel[] | null>;
  updateTask(
    taskId: string,
    taskDetails: ItaskDetails
  ): Promise<ItaskModel | null>;
  fetchEmployeesTask(employeeId:string,projectId:string):Promise<ItaskModel[] | null>
  fetchAllTasksOfEmployee(employeeId: string): Promise<ItaskModel[] | null>;
  
}
