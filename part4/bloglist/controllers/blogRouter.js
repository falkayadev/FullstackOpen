import express from "express";
const blogRouter = express.Router();
import Blog from "../models/blog.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import helper from "../tests/test_helper.js";
import config from "../utils/config.js";

blogRouter.get("/", async (_request, response, next) => {
  try {
    const allPosts = await Blog.find({}).populate("user");
    response.json(allPosts);
  } catch (err) {
    next(err);
  }
});

blogRouter.get("/:id", async (request, response, next) => {
  try {
    const result = await Blog.findById(request.params.id);
    if (result) {
      response.json(result);
    } else {
      response.status(404).end();
    }
  } catch (err) {
    next(err);
  }
});

blogRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const decodedToken = jwt.verify(helper.getTokenFrom(request), config.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  try {
    const user = await User.findById(decodedToken.id);
    const blog = new Blog({
      ...request.body,
      likes: request.body.likes || 0,
      user: user._id,
    });

    if (request.body.title === undefined || request.body.url === undefined) {
      return response.status(400).json({ error: "title or url missing" });
    } else {
      const savedBlog = await blog.save();
      response.status(201).json(savedBlog);
    }
  } catch (err) {
    return response.status(404).json({ error: "user not found" });
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    const result = await Blog.findByIdAndDelete(id);
    if (result) {
      response.status(204).end();
    } else {
      response.status(404).end();
    }
  } catch (err) {
    next(err);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  try {
    const exists = await Blog.findById(request.params.id);
    if (!exists) {
      return response.status(404).json({ error: "Blog post not found" });
    }

    const updatedPost = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true }
    );

    if (updatedPost) {
      response.json(updatedPost);
    } else {
      response.status(400).json({ error: "Update failed" });
    }
  } catch (err) {
    next(err);
  }
});

export default blogRouter;
