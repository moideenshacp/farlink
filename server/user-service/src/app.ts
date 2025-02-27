import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import logger from "./utils/logger";
import morgan from "morgan";
import userRoutes from "./routes/userRoute";
import companyRoutes from './routes/companyRoute'
import { rabbitmqConnect } from "../src/config/rabbitmq";
import { consumeEvents } from "../src/rabbitmq/consumer/consumer";

dotenv.config();
connectDB();
const startApplication = async () => {
  try {
      await rabbitmqConnect();
      await consumeEvents(); 
  } catch (error) {
      console.error("Failed to start application:", error);
  }
};

startApplication();
const app = express();
app.use(
  cors({
    origin: process.env.FRONT_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

const morganFormat = ":method :url :status :response-time ms";
// morganFormat says that I want to have the method, url , status and response in milli s

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/company", companyRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`auth-service== started on port ${port}`);
});
