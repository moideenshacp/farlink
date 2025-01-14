import mongoose, { Document } from "mongoose";

export default interface IpositionModel extends Document {
  organizationId?: mongoose.Types.ObjectId;
    positions:[string]

}
