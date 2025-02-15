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
      const result = await this._projectRepository.fetchProjects(
        organizationId
      );
      if (result) {
        return result;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async updateProject(
    projectId: string,
    projectDetails: IprojectDetails
  ): Promise<IprojectModel | null> {
    try {
      if (
        new Date(projectDetails.endDate) <= new Date(projectDetails.startDate)
      ) {
        throw new CustomError("End date must be after start date", 400);
      }
      const updatedProject = await this._projectRepository.updateProject(
        projectId,
        projectDetails
      );

      if (!updatedProject) {
        throw new CustomError("Project not found or could not be updated", 404);
      }

      return updatedProject;
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  }
  async fetchEmployeesProject(
    employeeId: string,
    organizationId: string
  ): Promise<IprojectModel[] | null> {
    try {
      const result = await this._projectRepository.fetchEmployeesProjects(
        organizationId,
        employeeId
      );
      if (result) {
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
