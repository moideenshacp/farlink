import { Request, Response } from "express";

    export  interface IemployeeController{
        registerEmployee(req:Request,res:Response):Promise<void>
    }