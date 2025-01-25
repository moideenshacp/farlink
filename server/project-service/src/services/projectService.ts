import { CustomError } from "../errors/CustomError";
import { IprojectDetails } from "../interfaces/IprojectDetails";
import IprojectModel from "../interfaces/IprojectModel";
import IprojectRepository from "../interfaces/IprojectRepository";
import { IprojectService } from "../interfaces/IprojectService";

export class projectService implements IprojectService {
  private _projectRepository: IprojectRepository;
  constructor(_projectRepository: IprojectRepository) {
    this._projectRepository = _projectRepository;
  }

  async createProject(
    projectDetails: IprojectDetails
  ): Promise<IprojectModel | null> {
    try {
      console.log("projectDetails", projectDetails);
      if (
        new Date(projectDetails.endDate) <= new Date(projectDetails.startDate)
      ) {
        throw new CustomError("End date must be after start date", 400);
      }
      const project = await this._projectRepository.createProject(
        projectDetails
      );

      return project;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async fetchAllProject(
    organizationId: string
  ): Promise<IprojectModel[] | null> {
    try {
      console.log(organizationId, "projects fetching orgId");
      const result = await this._projectRepository.fetchProjects(
        organizationId
      );
      if (result) {
        console.log(result, "all projects");
        return result;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
