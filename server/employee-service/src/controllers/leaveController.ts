import { Request, Response } from "express";
import { IleaveController } from "../interfaces/IleaveController";
import { CustomError } from "../errors/CustomError";
import { IleaveService } from "../interfaces/IleaveService";

export class leaveController implements IleaveController {
  private _leaveservice: IleaveService;

  constructor(_leaveservice: IleaveService) {
    this._leaveservice = _leaveservice
  }
  public handleLeaveApplication = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { leaveData } = req.body;
      const savedLeave = await this._leaveservice.handleLeaveApplication(leaveData);
      if(savedLeave){

        res.status(200).json({ message: "Leave applied successfully" });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        console.log("custom error underyyyy");

        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
  public fetchAppliedLeaves = async(req: Request, res: Response): Promise<void> =>{
    try {
      const {employeeEmail} = req.query
      const leaves = await this._leaveservice.fetchAppliedLeaves(employeeEmail as string)
      if(leaves){

        res.status(200).json({message:"Fetched Applied leaves",leaves})
      }
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });

    }
  }
  public ManageAppliedLeaves = async(req: Request, res: Response): Promise<void> => {
    try {
      const {leaveId,status } = req.body
      const updated = await this._leaveservice.ManageAppliedLeaves(leaveId,status)
      if(updated){
        
        res.status(200).json({message:"Leave Managed successfully.."})
        return
      }
      res.status(500).json({ error: "Internal Server Error" });

      
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });

    }
    
  }
  public fetchRemainingLeaves = async(req: Request, res: Response): Promise<void> =>{
    try {
      const {organizationId,employeeEmail}= req.query
      const result = await this._leaveservice.fetchRemainingLeaves(organizationId as string,employeeEmail as string)
      if(result){
        console.log("geyinngggg",result);
        
        res.status(200).json({message:"Remaining leaves fetched sucessfully",result})
        return
      }
      res.status(500).json({ error: "Internal Server Error" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });

    }
    
  }
  public editLeave = async(req: Request, res: Response): Promise<void>=> {
    try {
      const {leaveId,formData} = req.body
      const savedLeave = await this._leaveservice.editLeave(leaveId,formData)
      if(savedLeave){

        res.status(200).json({ message: "Leave edited successfully" });
      }else{

        res.status(400).json({ error: "Error in updating leave" });
      }
    } catch (error) {
      if (error instanceof CustomError) {
        console.log("custom error underyyyy");

        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
    
  }
  
}
