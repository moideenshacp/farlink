import { Request,Response } from "express";
import IuserModel from "./IuserModel";

export default interface IauthService{
    registersUser(name:string,email:string,password:string):Promise<IuserModel>
    verifyEmail(token: string): Promise<void>;
    loginUser(email:string,password:string):Promise<IuserModel>
    generatePasswordResetToken(email:string):Promise<void>
    resetPassword(password:string,token:string):Promise<IuserModel>

}