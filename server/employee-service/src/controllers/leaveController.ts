import { Request, Response } from "express";
import { IleaveController } from "../interfaces/IleaveController";
import { leaveService } from "../services/leaveService";
import { CustomError } from "../errors/CustomError";

export class leaveController implements IleaveController {
  private _leaveservice: leaveService;

  constructor() {
    this._leaveservice = new leaveService();
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
      const {employeeEmail} = req.body
      const leaves = await this._leaveservice.fetchAppliedLeaves(employeeEmail)
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
}
