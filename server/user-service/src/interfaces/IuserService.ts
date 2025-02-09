import IuserModel from "./IuserModel";

export default interface IuserService {
  registersUser(
    name: string,
    email: string,
    password: string
  ): Promise<IuserModel>;
  verifyEmail(token: string): Promise<void>;
  refreshToken(refreshToken: string): Promise<string>;
  loginUser(email: string, password: string): Promise<IuserModel>;
  generatePasswordResetToken(email: string): Promise<void>;
  resetPassword(password: string, token: string): Promise<IuserModel>;
  updateProfile(fName: string,lName:string,phone:string,email:string,image: string): Promise<IuserModel | null>;
  getUserProfile(email:string): Promise<IuserModel | null>;
  googleLogin(email:string,name:string,googleId:string,image:string): Promise<IuserModel>;
  fetchEmployeesId(employeeId:string[]):Promise<IuserModel[] | null>
  getAllEmployees(organizationId:string,page?:number,pageSize?:number):Promise<{ employees: IuserModel[]; totalEmployees: number }>


}
