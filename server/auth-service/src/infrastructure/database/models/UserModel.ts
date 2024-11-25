import mongoose, { Schema, Document } from "mongoose";
import { User } from "../../../core/entities/User";

type UserDocument = Omit<User, 'id'> & Document;

const UserSchema: Schema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, 
    default:'admin'
   },
  isActive: Boolean,
  verified: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model<UserDocument>("User", UserSchema);
