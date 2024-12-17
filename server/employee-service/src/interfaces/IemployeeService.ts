import { IemployeeData } from "./IemployeeData";


export interface IemployeeService {
    registerEmployee(employeeData:IemployeeData):Promise<void>
}