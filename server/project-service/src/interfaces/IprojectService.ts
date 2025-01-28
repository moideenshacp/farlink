import { IprojectDetails } from "./IprojectDetails";
import IprojectModel from "./IprojectModel";

export interface IprojectService{
    createProject(projectDetails:IprojectDetails):Promise<IprojectModel | null>
    fetchAllProject(organizationId:string):Promise<IprojectModel[] | null>
    updateProject(projectId:string,projectDetails:IprojectDetails):Promise<IprojectModel | null>
}