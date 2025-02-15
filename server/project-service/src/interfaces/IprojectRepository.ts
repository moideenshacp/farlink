import { IprojectDetails } from "./IprojectDetails";
import IprojectModel from "./IprojectModel";

export default interface IprojectRepository {
  createProject(projectDetails: IprojectDetails): Promise<IprojectModel | null>;
  fetchProjects(organizationId: string): Promise<IprojectModel[]>;
  fetchEmployeesProjects(organizationId: string,employeeId:string): Promise<IprojectModel[]>;
  updateProject(projectId: string,projectDetails: IprojectDetails): Promise<IprojectModel | null>;
  fetchProject(projectId: string): Promise<IprojectModel>

}
