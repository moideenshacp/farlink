import { Request, Response } from "express";

export interface ItaskController {
    createTask(req:Request,res:Response):Promise<Response>
    fetchTasks(req:Request,res:Response):Promise<Response>

}