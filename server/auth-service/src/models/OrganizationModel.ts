import mongoose, { Schema } from "mongoose";
import IorgModel from "../interfaces/IorganizationModel";

const orgSchema :Schema =new Schema({
    name:String,
    description:String,
    industry: String,
    subscriptionType: {
        type: String,
        enum:['free','premium'],
        default:"free"
    },
    street: String,
    country: String,
    state: String,
    city: String,
    zipcode: String,
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      }
})
export default mongoose.model<IorgModel>("Organization",orgSchema)