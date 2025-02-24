import { Request, Response } from "express";
import { IcompanyController } from "../interfaces/IcompanyController";
import { companyValidationSchema } from "../validators/CompanyValidation";
import IcompanyService from "interfaces/IcompanyService";
import { HttpStatusCode } from "../constants/HttpStatusCode";
import { MessageConstants } from "../constants/MessageConstants";

export class companyController implements IcompanyController {
  private _companyservice: IcompanyService;

  constructor(_companyservice: IcompanyService) {
    this._companyservice = _companyservice;
  }

  public registerCompany = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { organization } = req.body;

      const organizationId =
        await this._companyservice.registerCompany(organization);
      res
        .status(HttpStatusCode.CREATED)
        .json({
          message: MessageConstants.ORGANIZATION_REGISTERED,
          organizationId,
        });
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
      res.status(HttpStatusCode.CREATED).json({
        message: MessageConstants.ORGANIZATION_DATA_FETCHED,
        companyDetails,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: MessageConstants.INTERNAL_SERVER_ERROR });
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
        res.status(HttpStatusCode.BAD_REQUEST).json({
          message: "Validation error",
          details: error.details,
        });
      }
      await this._companyservice.updateCompanyProfile(FormData, email);

      res.status(HttpStatusCode.CREATED).json({
        message: MessageConstants.ORGANIZATION_DATA_FETCHED,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: MessageConstants.INTERNAL_SERVER_ERROR });
    }
  };
  public fetchAllOrganization = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const allOrganizations =
        await this._companyservice.fetchAllOrganization();

      if (!allOrganizations) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: MessageConstants.ORGANIZATION_NOT_FOUND });
        return;
      }
      res.status(HttpStatusCode.OK).json({
        message: MessageConstants.ORGANIZATIONS_FETCHED,
        data: allOrganizations,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: MessageConstants.INTERNAL_SERVER_ERROR });
    }
  };
  public blockOrganization = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { email } = req.query;

      const result = await this._companyservice.blockOrganization(
        email as string
      );
      if (result) {
        res.status(HttpStatusCode.OK).json({
          message: MessageConstants.ORGANIZATION_BLOCKED,
          result,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: MessageConstants.INTERNAL_SERVER_ERROR });
    }
  };
  public findSubcription = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const email = req.query.email as string;
      const details = await this._companyservice.findSubcription(email);
      res
        .status(HttpStatusCode.OK)
        .json({ message: MessageConstants.FETCH_SUBSCRIPTION, details });
    } catch (error) {
      console.log(error);
    }
  };
}





