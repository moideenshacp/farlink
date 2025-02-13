import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI as string);
    console.log("mongodb connected successfully");
  } catch (error) {
    console.log(error);
    console.log("mongodb connection failed");
  }
};

export default connectDB;
