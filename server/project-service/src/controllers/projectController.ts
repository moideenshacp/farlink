import { Request, Response } from "express";
import { IprojectController } from "../interfaces/IprojectController";
import { IprojectService } from "../interfaces/IprojectService";
import { projectDetailsSchema } from "../validators/CreateProjectValidation";
import { CustomError } from "../errors/CustomError";

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
        return res.status(400).json({
          message: "Validation failed",
          errors: error.details.map((err) => err.message),
        });
      }

      const result = await this._projectservice.createProject(projectDetails);
      if (result) {
        return res
          .status(200)
          .json({ message: "Project added successfully..." });
      } else {
        return res
          .status(400)
          .json({ message: "Something went wrong,please try again..." });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "Internal Server Error" });
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
          .status(200)
          .json({ message: "Projects fetched successfully...", result });
      } else {
        return res
          .status(400)
          .json({ message: "Something went wrong,please try again..." });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };

  public updateProject = async(req: Request, res: Response): Promise<Response> =>{
    try {
      const {projectId,projectDetails} = req.body
      console.log("projcetID:",projectId);
      
      await this._projectservice.updateProject(projectId,projectDetails)
      return res.status(200).json({message:"Project updated sucessfully.."})
      
    } catch (error) {
    console.log(error);
    return res.status(500).json({message:"An error occured while updating project"})
    
      
    }
    
  }
}
