import IorgModel from "./IorganizationModel";
import IuserModel from "./IuserModel";

export default interface IcompanyService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    registerCompany(organization:any):Promise<string>;
    fetchCompanyProfile(email:string):Promise<IorgModel | null>;
    updateCompanyProfile(FormData:object,email:string):Promise<IorgModel | null>;
    fetchAllOrganization():Promise<IorgModel[] | null>;
    blockOrganization(email:string):Promise<IuserModel | null>;
}