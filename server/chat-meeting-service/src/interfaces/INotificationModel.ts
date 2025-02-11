import mongoose, { Document } from "mongoose"

export default interface InotificationModel extends Document {

    sender: mongoose.Types.ObjectId;  
    reciever: mongoose.Types.ObjectId; 
    message:string
    timestamp:Date
    read:boolean
}