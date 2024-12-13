import { Request, Response } from "express";

export interface IauthController {
  registerUser(req: Request, res: Response): Promise<void>;
  verifyEmail(req: Request, res: Response): Promise<void>;
  loginUser(req: Request, res: Response): Promise<Response>;
  logoutUser(req: Request, res: Response): Promise<Response>;
  forgetPassword(req: Request, res: Response): Promise<void>;
  resetPassword(req: Request, res: Response): Promise<Response>;
  refreshToken(req:Request,res:Response):Promise<Response>
  updateProfile(req:Request,res:Response):Promise<void>
  getUserProfile(req:Request,res:Response):Promise<void>
}
