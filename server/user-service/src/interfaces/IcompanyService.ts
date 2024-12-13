import { ObjectId } from "mongoose";
import IorgModel from "./IorganizationModel";
import IuserModel from "./IuserModel";

export default interface IcompanyService {
    registerCompany(organization:any):Promise<void>;
    fetchCompanyProfile(email:string):Promise<IorgModel | null>;
    updateCompanyProfile(FormData:object,email:string):Promise<IorgModel | null>;
    fetchAllOrganization():Promise<IorgModel[] | null>;
    blockOrganization(email:string):Promise<IuserModel | null>;
}