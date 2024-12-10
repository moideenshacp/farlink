export default interface IcompanyService {
    registerCompany(organization:any):Promise<void>;
    fetchCompanyProfile(email:string):Promise<void>;
}