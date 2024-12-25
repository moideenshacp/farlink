import { IemployeeData } from "./IemployeeData";
import IemployeeModel from "./IemployeeModel";


export interface IemployeeService {
    registerEmployee(employeeData:IemployeeData):Promise<IemployeeModel | null>
    getAllEmployees(organizationId:string):Promise<IemployeeModel[] | null>
    updateEmployee(employeeId:string,employeeData:IemployeeModel | null):Promise<IemployeeModel>
    inviteEmployee(email:string):Promise<string>
    setUpPassword(password:string,email:string):Promise<string>
}