import { Request, Response } from "express";

export interface IprojectController {
    createProject(req:Request,res:Response):Promise<Response>
}