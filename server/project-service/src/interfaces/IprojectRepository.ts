import { IprojectDetails } from "./IprojectDetails";
import IprojectModel from "./IprojectModel";

export default interface IprojectRepository {
  createProject(projectDetails: IprojectDetails): Promise<IprojectModel | null>;
  fetchProjects(organizationId: string): Promise<IprojectModel[]>;

}
