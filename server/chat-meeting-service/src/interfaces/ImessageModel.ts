import mongoose, { Document } from "mongoose";

export default interface ImessageModel extends Document{
    content:string
    sender:mongoose.Schema.Types.ObjectId
    chatId:mongoose.Schema.Types.ObjectId
    readBy:mongoose.Schema.Types.ObjectId[]
    createdAt:Date
    updatedAt:Date
}