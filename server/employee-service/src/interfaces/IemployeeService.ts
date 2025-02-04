/* eslint-disable @typescript-eslint/no-explicit-any */
import { IemployeeData } from "./IemployeeData";
import IemployeeModel from "./IemployeeModel";
import IpositionModel from "./IpositionModel";


export interface IemployeeService {
    registerEmployee(employeeData:IemployeeData):Promise<IemployeeModel | null>
    getAllEmployees(organizationId:string,page?:number,pageSize?:number):Promise<{ employees: IemployeeModel[]; totalEmployees: number }>
    updateEmployee(employeeId:string,employeeData:IemployeeModel | null):Promise<IemployeeModel>
    inviteEmployee(email:string):Promise<string>
    setUpPassword(password:string,email:string):Promise<string>
    EmployeesCount(organizationId:string):Promise<any>
    TerminateEmployee(email:string):Promise<any>
    AddPosition(organizationId:string,position:string):Promise<IpositionModel | null>
    fetchPosition(organizationId:string):Promise<IpositionModel | null>
    fetchEmployeesId(employeeId:string[]):Promise<IemployeeModel[] | null>
}