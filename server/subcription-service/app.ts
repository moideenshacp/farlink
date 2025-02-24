import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db";
import logger from "./src/utils/logger";
import morgan from "morgan";
import subscriptionRoutes from './src/routes/subcriptionRoute';
import { rabbitmqConnect } from "./src/config/rabbitmq";
import { consumeEvents } from "./src/rabbitmq/consumer/consumer";
import webhookRoute from "./src/routes/webHookRoute";
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

app.use("/webhook", express.raw({ type: 'application/json' }), webhookRoute);

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());


app.use('/api/subscription', subscriptionRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`subcription-service== started on port ${port}`);
});

