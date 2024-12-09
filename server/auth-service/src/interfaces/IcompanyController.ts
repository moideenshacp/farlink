import { Request, Response } from "express";

export interface IcompanyController {
    registerCompany(req:Request,res:Response):Promise<void>;
}