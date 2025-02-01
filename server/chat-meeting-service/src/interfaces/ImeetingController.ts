import { Request, Response } from "express";

export interface ImeetingController {
  createMeeting(req: Request, res: Response): Promise<Response>;
  fetchMeeting(req: Request, res: Response): Promise<Response>;
  editMeeting(req: Request, res: Response): Promise<Response>;
  deleteMeeting(req: Request, res: Response): Promise<Response>;
  fetchAllMeetsOfEmployee(req: Request, res: Response): Promise<Response>;
//   joinMeeting(req: Request, res: Response): Promise<Response>;
}
