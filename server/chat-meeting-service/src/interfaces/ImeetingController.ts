import { Request, Response } from "express";

export interface ImeetingController {
  createMeeting(req: Request, res: Response): Promise<void>;
}
