import { FilterQuery } from "mongoose";
import IuserModel from "./IuserModel";

export default interface IuserRepo{
    findByEmail(email:string):Promise<IuserModel | null>
    createUser(userData:Partial<IuserModel>):Promise<IuserModel | null>
    update(filter: FilterQuery<IuserModel>, update: Partial<IuserModel>): Promise<IuserModel | null>;

}