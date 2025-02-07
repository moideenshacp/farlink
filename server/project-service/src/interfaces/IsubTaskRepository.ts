/* eslint-disable @typescript-eslint/no-explicit-any */
import IsubTaskModel from "./IsubTaskModel";

export default interface IsubTaskRepository {
  createMultipleTasks(taskDetails: IsubTaskModel[]): Promise<IsubTaskModel[]>;
  fetchEmployeesTasks(
    projectId: string,
    employeeId: string
  ): Promise<IsubTaskModel[]>;
  updateSubTask(
    taskId: string,
    taskDetails: any
  ): Promise<IsubTaskModel | null>;
  fetchAllTasksOfEmployee(employeeId: string): Promise<IsubTaskModel[]>;
  fetchSubTasksByParentTaskId(parentTaskId: string): Promise<IsubTaskModel[]>
}
