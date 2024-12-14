import express from "express";
const loginRouter = express.Router();
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../utils/config.js";
import middleware from "../utils/middleware.js";

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, config.SECRET);

  response.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60,
  });

  response.status(200).send({
    username: user.username,
    name: user.name,
  });
});

loginRouter.post("/logout", (_request, response) => {
  response.clearCookie("token");
  response.status(204).send();
});

loginRouter.get(
  "/status",
  middleware.authenticateToken,
  (request, response) => {
    response.status(200).json({
      username: request.user.username,
      name: request.user.name,
    });
  }
);
export default loginRouter;
