import { Request, Response } from "express";

export interface IcompanyController {
    registerCompany(req:Request,res:Response):Promise<void>;
    fetchCompanyProfile(req:Request,res:Response):Promise<void>;
    updateCompanyProfile(req:Request,res:Response):Promise<void>;
    updateCompanyProfile(req:Request,res:Response):Promise<void>;
    fetchAllOrganization(req:Request,res:Response):Promise<void>
}