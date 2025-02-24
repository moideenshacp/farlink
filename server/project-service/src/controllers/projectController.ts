import { Request, Response } from "express";
import { IprojectController } from "../interfaces/IprojectController";
import { IprojectService } from "../interfaces/IprojectService";
import { projectDetailsSchema } from "../validators/CreateProjectValidation";
import { CustomError } from "../errors/CustomError";
import { HttpStatusCode } from "../constants/HttpStatusCode";
import { MessageConstants } from "../constants/MessageConstants";

export class projectController implements IprojectController {
  private _projectservice: IprojectService;
  constructor(_projectservice: IprojectService) {
    this._projectservice = _projectservice;
  }

  public createProject = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { projectDetails } = req.body;
      const { error } = projectDetailsSchema.validate(projectDetails, {
        abortEarly: false,
      });

      if (error) {
        console.log(error);
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          message: "Validation failed",
          errors: error.details.map((err) => err.message),
        });
      }

      const result = await this._projectservice.createProject(projectDetails);
      if (result) {
        return res
          .status(HttpStatusCode.OK)
          .json({ message: MessageConstants.PROJECT_ADDED });
      } else {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: MessageConstants.BAD_REQUEST});
      }
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
      }
    }
  };
  public fetchAllProject = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { organizationId } = req.query;
      const result = await this._projectservice.fetchAllProject(
        organizationId as string
      );
      if (result) {
        return res
          .status(HttpStatusCode.OK)
          .json({ message: MessageConstants.PROJECTS_FETCHED, result });
      } else {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: MessageConstants.BAD_REQUEST });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
      }
    }
  };

  public updateProject = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { projectId, projectDetails } = req.body;
      const updatedProject = await this._projectservice.updateProject(
        projectId,
        projectDetails
      );
      if (updatedProject) {
        return res
          .status(HttpStatusCode.OK)
          .json({ message: MessageConstants.PROJECT_UPDATED });
      } else {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: MessageConstants.BAD_REQUEST });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
      }
    }
  };
  public fetchEmployeesProject = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { employeeId, organizationId } = req.query;
      const result = await this._projectservice.fetchEmployeesProject(
        employeeId as string,
        organizationId as string
      );
      if (result) {
        return res
          .status(HttpStatusCode.OK)
          .json({ message: MessageConstants.FETCH_EMPLOYEES_PROJECT, result });
      } else {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: MessageConstants.BAD_REQUEST });
      }
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: MessageConstants.INTERNAL_SERVER_ERROR });
      }
    }
  };
}
