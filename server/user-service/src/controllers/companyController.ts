import  { Request, Response } from "express";
import { IcompanyController } from "../interfaces/IcompanyController";
import { companyValidationSchema } from "../validators/CompanyValidation";
import IcompanyService from "interfaces/IcompanyService";

export class companyController implements IcompanyController {
  private _companyservice: IcompanyService;

  constructor(_companyservice: IcompanyService) {
    this._companyservice = _companyservice
  }

  public registerCompany = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      console.log("get in tooo copany");

      const { organization } = req.body;

      const organizationId = await this._companyservice.registerCompany(organization);
      res.status(201).json({ message: "organization registered successfully",organizationId, });
    } catch (error) {
      console.log(error);
    }
  };
  public fetchCompanyProfile = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { email } = req.query;
      const companyDetails = await this._companyservice.fetchCompanyProfile(
        email as string
      );
      res.status(201).json({
        message: "organization data fetched successfully",
        companyDetails, 
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public updateCompanyProfile = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { FormData, email } = req.body;

      const { error } = companyValidationSchema.validate(FormData, {
        abortEarly: false,
      });

      if (error) {
        res.status(400).json({
          message: "Validation error",
          details: error.details,
        });
      }
      console.log("formData", FormData);

      await this._companyservice.updateCompanyProfile(FormData, email);

      console.log("update company", req.body);
      res.status(201).json({
        message: "organization data fetched successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  public fetchAllOrganization = async(req: Request, res: Response): Promise<void>=> {
    try {
      const allOrganizations = await this._companyservice.fetchAllOrganization()

      if(!allOrganizations){
        res.status(404).json({ message: "No organizations found." });
        return;
      }
      res.status(200).json({
        message: "Organizations fetched successfully",
        data: allOrganizations,
      });
      
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Internal server error" });
    }
  }
  public blockOrganization = async(req: Request, res: Response): Promise<void>=> {
    try {
      const {email} = req.query

     const result = await this._companyservice.blockOrganization(email as string)
      console.log(email);
 
      if(result){
      res.status(200).json({
        message:"Organization blocked successfully",result
      })
    }
    
    } catch (error) {
      console.log(error)
      res.status(500).json({message:"Internal server error"})
      
    }
  }
  public findSubcription = async(req: Request, res: Response): Promise<void>=> {
    try {

      console.log("-----------------------------------------------------------------------------------------------------");
      
      const email = req.query.email as string;         
      const details = await this._companyservice.findSubcription(email)
      res.status(200).json({message:"sucessfully fetch subcription plans",details})
    } catch (error) {
      console.log(error);
      
    }
}
  

}
