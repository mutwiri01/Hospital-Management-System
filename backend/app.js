import express from "express";
import { config } from 'dotenv';
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import userRouter from "./router/userRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();
config({ path: "./config/config.env" });

// CORS configuration
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL, "https://apihms.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Important for allowing cookies to be sent
  })
);

// Middleware setup
app.use(cookieParser()); // Parses cookies for easy access
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Route definitions
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/appointment", appointmentRouter); // Adjusted path prefix
app.use("/api/v1/user", userRouter);

// Database connection
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

export default app;
