import { Request, Response } from "express";

    export  interface IemployeeController{
        registerEmployee(req:Request,res:Response):Promise<void>
        getAllEmployees(req:Request,res:Response):Promise<void>
        updateEmployees(req:Request,res:Response):Promise<void>
        inviteEmployee(req:Request,res:Response):Promise<void>
        setUpPassword(req:Request,res:Response):Promise<void>
        EmployeesCount(req:Request,res:Response):Promise<void>
        TerminateEmployee(req:Request,res:Response):Promise<void>
        AddPosition(req:Request,res:Response):Promise<void>
        fetchPosition(req:Request,res:Response):Promise<void>
        fetchEmployeesId(req:Request,res:Response):Promise<void>
    }