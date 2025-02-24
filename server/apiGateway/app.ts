import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import proxy from "express-http-proxy";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { authenticate } from "./src/middlewares/authMiddleware";


dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
app.use(morgan("tiny"));
app.use(
  cors({
    origin: "https://farlink.moideensha.store",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use("/auth-service", proxy(`${process.env.AUTH_SERVICE_URL}`));
app.use("/employee-service",authenticate, proxy(`${process.env.EMPLOYEE_SERVICE_URL}`));
app.use(
  "/subcription-service",authenticate,
  proxy(`${process.env.SUBCRIPTION_SERVICE_URL}`)
);
app.use("/project-service",authenticate, proxy(`${process.env.PROJECT_SERVICE_URL}`));
app.use("/chat-meet-service",authenticate, proxy(`${process.env.CHAT_MEET_SERVICE_URL}`));

const port = process.env.SERVER_PORT || 4000;

app.listen(port, () => {
  console.log(`API GATEWAYY RUNNING ON ${port}`);
});
