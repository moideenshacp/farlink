import { ObjectId } from "mongoose";
import IorgModel from "./IorganizationModel";

export default interface IcompanyService {
    registerCompany(organization:any):Promise<void>;
    fetchCompanyProfile(email:string):Promise<IorgModel | null>;
    updateCompanyProfile(FormData:object,email:string):Promise<IorgModel | null>;
}