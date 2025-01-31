import mongoose from "mongoose";

export interface ImeetDetails{
    meetTitle:string;
    meetDate:Date
    meetTime:string 
    members:mongoose.Types.ObjectId[]
    meetId?:string
    organizationId?:mongoose.Types.ObjectId

}