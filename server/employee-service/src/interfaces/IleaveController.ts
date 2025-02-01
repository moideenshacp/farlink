import { Request, Response } from "express";

export interface IleaveController {
    handleLeaveApplication(req: Request, res: Response): Promise<void>;
    fetchAppliedLeaves(req: Request, res: Response): Promise<void>;
    ManageAppliedLeaves(req: Request, res: Response): Promise<void>;
    fetchRemainingLeaves(req: Request, res: Response): Promise<void>;
    editLeave(req: Request, res: Response): Promise<void>;
}
