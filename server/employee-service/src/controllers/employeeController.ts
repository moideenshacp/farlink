import { IemployeeController } from "../interfaces/IemployeeController";
import { Request, Response } from "express";
import { employeeService } from "../services/employeeService";
import { registerEmployeeSchema } from "../validators/RegisterEmployeeValidator";
import { employeeProfileUpdate } from "../validators/EmployeeProfileUpdate";

export class employeeController implements IemployeeController{

    private _employeeservice:   employeeService

    constructor(){
        this._employeeservice = new employeeService()
    }
    

    public registerEmployee= async(req: Request,res:Response): Promise<void>=> {
        try {
            const {employeeData} = req.body;

            console.log("emoloyeee",employeeData);
            
            const {error}= registerEmployeeSchema.validate(employeeData,{
                abortEarly:false
            })

            if(error){
                res.status(400).json({
                    message:"validaton error",
                    details: error.details[0].message
                    
                })
                console.log("Validation Error:", error.details);
                return
            }
            await this._employeeservice.registerEmployee(employeeData)
        
            
            res.status(200).json({message:"Employee added successfully"})
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" }); 
        }
    }
     public getAllEmployees = async(req: Request, res: Response): Promise<void> =>{
        try {
            console.log("gte in allllll");
            

            const {organizationId} = req.query
            if(!organizationId){
                throw new Error("organix=zation id is needed")
            }
            const employees = await this._employeeservice.getAllEmployees(organizationId as string)            
            res.status(200).json({message:"sucess",employees})
            
        } catch (error) {
            console.log(error)
            res.status(500).json({message:"Interval server error"})
            
        }
    }
    public updateEmployees = async(req: Request, res: Response): Promise<void> =>{
        try {
            console.log("get in to update=======================================");
            

            const { employeeId, ...otherData } = req.body.data;
            const { error } = employeeProfileUpdate.validate(otherData, {
              abortEarly: false,
            });
            
            if(error){
                res.status(400).json({
                    message:"validaton error",
                    details: error.details[0].message
                    
                })
                console.log("Validation Error:", error.details);
                return
            }

            const updatedEmployee = await this._employeeservice.updateEmployee(employeeId,otherData)
            if(updatedEmployee){

                res.status(200).json({message:"employee updated"})
            }

        } catch (error) {
            console.log(error);
            
        }
    }

    

}