import { IemployeeData } from "../interfaces/IemployeeData";
import { IemployeeService } from "../interfaces/IemployeeService";
import { employeeRepository } from "../repositories/employeeRepository";



export class employeeService implements IemployeeService{

    private _employeeRepository:employeeRepository

    constructor (){
        this._employeeRepository = new employeeRepository()

    }

    async registerEmployee(employeeData:IemployeeData): Promise<void> {
        try {
            console.log("username",employeeData);
            

            const employeeExist = await this._employeeRepository.findByEmail(employeeData.email)
            if(employeeExist){
                throw new Error("already exist")
            }

            const registeredEmployee = await this._employeeRepository.createEmployee(employeeData)

            console.log("savedd",registeredEmployee);
            
            
        } catch (error) {
            console.log(error);
            
        }
    }
}