import { publishEvent } from "../../rabbitmq/producer/producer";
import { IemployeeData } from "../interfaces/IemployeeData";
import IemployeeModel from "../interfaces/IemployeeModel";
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

            const queue = "user-service-queue"
            await publishEvent(queue,{
                event:"REGISTER_EMPLOYEE",
                payload:{
                    id:registeredEmployee?._id,
                    name:registeredEmployee?.userName,
                    email:registeredEmployee?.email,
                    firstName:registeredEmployee?.firstName,
                    lastName:registeredEmployee?.lastName,
                    phone:registeredEmployee?.phone,
                    role:registeredEmployee?.role,
                    image:registeredEmployee?.image,
                    organizationId:registeredEmployee?.organizationId
                }
            })
            
            
        } catch (error) {
            console.log(error);
            
        }
    }
    async getAllEmployees(organizationId: string): Promise<IemployeeModel[] | null> {
        try {
            console.log(organizationId,"orgggid----------------------");
            
            const allEmployees = await this._employeeRepository.findByOrganizationId(organizationId)
            
            console.log(allEmployees,'allEmployees for company');
            return allEmployees
            
        } catch (error) {
            console.log(error);
            return null
            
        }
    }
}