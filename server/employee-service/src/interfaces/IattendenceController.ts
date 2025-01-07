import { Request, Response } from "express";

export interface IattendenceController {
  UpdateAttendencePolicy(req: Request, res: Response): Promise<void>;
  getAttendencePolicy(req: Request, res: Response): Promise<void>;
  handleAttendence(req:Request,res:Response):Promise<void>
  getAttendenceReport(req: Request, res: Response): Promise<void>;
}
