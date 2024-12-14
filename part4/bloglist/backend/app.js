import express from "express";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import config from "./utils/config.js";
import blogRouter from "./controllers/blogRouter.js";
import userRouter from "./controllers/userRouter.js";
import middleware from "./utils/middleware.js";
import cookieParser from "cookie-parser";
import loginRouter from "./controllers/loginRouter.js";
import morgan from "morgan";

mongoose.connect(config.MONGODB_URI);
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/blogs", middleware.authenticateToken, blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use(middleware.errorHandler);

export default app;
