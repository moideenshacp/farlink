import { CustomError } from "../errors/CustomError";
import { IprojectDetails } from "../interfaces/IprojectDetails";
import IprojectModel from "../interfaces/IprojectModel";
import IprojectRepository from "../interfaces/IprojectRepository";
import projectModel from "../models/projectModel";
import BaseRepository from "./baseRepository";

export class projectRepository
  extends BaseRepository<IprojectModel>
  implements IprojectRepository
{
  constructor() {
    super(projectModel);
  }
  async createProject(
    projectDetails: IprojectDetails
  ): Promise<IprojectModel | null> {
    return this.save(projectDetails);
  }
    async fetchProject(projectId: string): Promise<IprojectModel> {
      try {
        const projects = await this.model.findById(projectId );
        if (!projects) {
          throw new CustomError("No projects found",400)
        }
        return projects;
      } catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
      }
    }
  async fetchProjects(organizationId: string): Promise<IprojectModel[]> {
    try {
      const projects = await this.model.find({ organizationId });
      return projects;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  }
  async updateProject(
    projectId: string,
    projectDetails: IprojectDetails
  ): Promise<IprojectModel | null> {
    try {
      const updatedProject = await this.model.findByIdAndUpdate(
        projectId,
        { $set: projectDetails },
        { new: true }
      );

      return updatedProject;
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  }
  async fetchEmployeesProjects(
    organizationId: string,
    employeeId: string
  ): Promise<IprojectModel[]> {
    try {
      const projects = await this.model.find({
        organizationId,
        $or: [
          { "members": employeeId },
          { "manager": employeeId },
        ],
      });
      return projects;
    } catch (error) {
      console.error("Error fetching employee's projects:", error);
      throw error;
    }
  }
  
}
