import express from "express";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import config from "./utils/config.js";
import testingRouter from "./controllers/testRouter.js";

import blogRouter from "./controllers/blogRouter.js";
import userRouter from "./controllers/userRouter.js";
import middleware from "./utils/middleware.js";
import loginRouter from "./controllers/loginRouter.js";
import morgan from "morgan";

mongoose.connect(config.MONGODB_URI);
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(middleware.getToken);
if (process.env.NODE_ENV === "test") {
  app.use("/api/testing", testingRouter);
}
app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);
app.use(middleware.errorHandler);

export default app;
