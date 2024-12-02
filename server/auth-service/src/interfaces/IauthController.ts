import { Request,Response } from "express"

export interface IauthController{
    registerUser(req:Request,res:Response):Promise<void>
    verifyEmail(req:Request,res:Response):Promise<void>
    loginUser(req:Request,res:Response):Promise<Response>
}