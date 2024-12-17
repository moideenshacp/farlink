import { IemployeeController } from "../interfaces/IemployeeController";
import { registerEmployeeSchema } from "../../validators/RegisterEmployeeValidator";
import { Request, Response } from "express";
import { employeeService } from "../services/employeeService";

export class employeeController implements IemployeeController{

    private _employeeservice:   employeeService

    constructor(){
        this._employeeservice = new employeeService()
    }
    

    public registerEmployee= async(req: Request,res:Response): Promise<void>=> {
        try {
            const {userName,firstName,lastName,email,phone,gender,position} = req.body
            console.log("userrr",userName);
            
            const employeeData = req.body;
            const {error}= registerEmployeeSchema.validate(employeeData,{
                abortEarly:false
            })

            if(error){
                res.status(400).json({
                    message:"validaton error",
                    details: error.details[0].message
                })
            }
            const employee = await this._employeeservice.registerEmployee(employeeData)
            console.log(employee);
            
            console.log(userName,firstName,lastName,email,phone,gender,position)
            res.status(200).json({message:"suceess"})
            
        } catch (error) {
            console.log(error);
            
        }
    }
}