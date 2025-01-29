import { ItaskDetails } from "./ItaskDetails";
import ItaskModel from "./ItaskModel";

export interface ItaskService{
    createTask(taskDetails:ItaskDetails):Promise<ItaskModel | null>

}