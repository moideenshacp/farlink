import { Request, Response } from "express";

export interface IuserController {
  registerUser(req: Request, res: Response): Promise<void>;
  verifyEmail(req: Request, res: Response): Promise<void>;
  loginUser(req: Request, res: Response): Promise<Response>;
  logoutUser(req: Request, res: Response): Promise<Response>;
  forgetPassword(req: Request, res: Response): Promise<void>;
  resetPassword(req: Request, res: Response): Promise<Response>;
  refreshToken(req:Request,res:Response):Promise<Response>
  updateProfile(req:Request,res:Response):Promise<void>
  getUserProfile(req:Request,res:Response):Promise<void>
  googleLogin(req:Request,res:Response):Promise<Response>
  fetchEmployeesId(req:Request,res:Response):Promise<void>
  getAllEmployees(req:Request,res:Response):Promise<void>



}
