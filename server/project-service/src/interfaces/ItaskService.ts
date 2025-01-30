import { ItaskDetails } from "./ItaskDetails";
import ItaskModel from "./ItaskModel";

export interface ItaskService {
  createTask(taskDetails: ItaskDetails): Promise<ItaskModel | null>;
  fetchTasks(projectId: string): Promise<ItaskModel[] | null>;
}
