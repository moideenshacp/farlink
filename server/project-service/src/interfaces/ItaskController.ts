import { Request, Response } from "express";

export interface ItaskController {
    createTask(req:Request,res:Response):Promise<Response>
    fetchTasks(req:Request,res:Response):Promise<Response>
    updateTask(req:Request,res:Response):Promise<Response>
    fetchEmployeesTask(req:Request,res:Response):Promise<Response>

}