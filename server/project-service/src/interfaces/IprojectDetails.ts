import mongoose from "mongoose";

export interface IprojectDetails{
    projectName:string;
    projectDescription:string
    startDate:Date
    endDate:Date
    manager:mongoose.Types.ObjectId
    members:mongoose.Types.ObjectId[]
    organizationId:mongoose.Types.ObjectId
    priority:"high" | "medium" | "low"


}