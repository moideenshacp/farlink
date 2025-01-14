import mongoose, { Schema } from "mongoose";
import IpositionModel from "../interfaces/IpositionModel";

const positionSchema:Schema = new Schema({
    organizationId:{
       type: mongoose.Schema.ObjectId
    },
    positions:{
        type: [String]  
    }
})

export default mongoose.model<IpositionModel>("positions", positionSchema);
