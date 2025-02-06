import IsubTaskModel from "./IsubTaskModel";

export default interface IsubTaskRepository {
  createMultipleTasks(taskDetails: IsubTaskModel[]): Promise<IsubTaskModel[]>

}
