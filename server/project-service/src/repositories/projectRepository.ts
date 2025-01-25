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
  async fetchProjects(organizationId: string): Promise<IprojectModel[]> {
    try {
      const projects = await this.model.find({ organizationId}); 
      return projects;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  }
  
}
