import { ItaskDetails } from "./ItaskDetails";
import ItaskModel from "./ItaskModel";

export default interface ItaskRepository {
  createTask(taskDetails: ItaskDetails): Promise<ItaskModel | null>;
  fetchTasks(projectId: string): Promise<ItaskModel[]>;
  updateTask(
    taskId: string,
    taskDetails: ItaskDetails
  ): Promise<ItaskModel | null>;
  fetchEmployeesTasks(
    projectId: string,
    employeeId: string
  ): Promise<ItaskModel[]>;
}
