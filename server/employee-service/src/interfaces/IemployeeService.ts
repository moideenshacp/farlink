import { IemployeeData } from "./IemployeeData";
import IemployeeModel from "./IemployeeModel";


export interface IemployeeService {
    registerEmployee(employeeData:IemployeeData):Promise<void>
    getAllEmployees(organizationId:string):Promise<IemployeeModel[] | null>
}