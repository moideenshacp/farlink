import { Request, Response } from "express";
import { IcompanyController } from "../interfaces/IcompanyController";
import { companyService } from "../services/companyService";

export class companyController implements IcompanyController {
  private _companyservice: companyService;

  constructor() {
    this._companyservice = new companyService();
  }

  public registerCompany = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      console.log("get in tooo copany");

      const { organization } = req.body;

      await this._companyservice.registerCompany(organization);
      res.status(201).json({ message: "organization registered successfully" });
    } catch (error) {
      console.log(error);
    }
  };
  public fetchCompanyProfile = async(req:Request,res:Response):Promise<void>=>{
    try {

      const {email} = req.body

      await this._companyservice.fetchCompanyProfile(email)
      res.status(201).json({ message: "organization data fetched successfully" });
      
      
    } catch (error) {
      console.log(error);
      
    }
  }
}
