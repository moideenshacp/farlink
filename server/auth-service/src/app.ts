import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import AuthRoutes from "./presentation/routes/AuthRoutes";
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.FRONT_URL,
  methods: ['GET','POST'],
  allowedHeaders: ['Content-Type']

}))
app.use(bodyParser.json());
app.use("/api/auth", AuthRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/farlink-auth-service')
  .then(() => {
    console.log("MongoDB connected...");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err)=>{
    console.log(err);
    
  })
