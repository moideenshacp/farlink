import mongoose from "mongoose"

export interface IattendencePolicy{
    lateMarkAfterMinutes?:string | number
    organizationId?: mongoose.Types.ObjectId 
    officeStartTime?:string | number,
    officeEndTime?:string | number,
    halfDayAfterHours?:string | number,
    totalWorkingHours?:string | number
    casual?:string | number,
    sick?:string | number,
    vacation?:string | number
}
