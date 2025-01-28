import { Request, Response } from "express";

export interface IprojectController {
    createProject(req:Request,res:Response):Promise<Response>
    fetchAllProject(req:Request,res:Response):Promise<Response>
    updateProject(req:Request,res:Response):Promise<Response>
    fetchEmployeesProject(req:Request,res:Response):Promise<Response>
}