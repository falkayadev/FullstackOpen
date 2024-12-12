import express from "express";
const userRouter = express.Router();
import User from "../models/user.js";
import bcrypt from "bcrypt";

const saltRound = 10;

userRouter.get("/", async (_request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users);
});

userRouter.get("/:id", async (request, response, next) => {
  try {
    const result = await User.findById(request.params.id).populate("blogs");
    if (result) {
      response.json(result);
    } else {
      response.status(404).end();
    }
  } catch (err) {
    next(err);
  }
});

userRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    if (body.password.length < 3) {
      return response
        .status(400)
        .json({ error: "Password must be at least 3 characters long" });
    }
    const salt = await bcrypt.genSalt(saltRound);
    const passwordHash = await bcrypt.hash(body.password, salt);
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
});

export default userRouter;
