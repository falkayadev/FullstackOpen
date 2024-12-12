import express from "express";
const blogRouter = express.Router();
import Blog from "../models/blog.js";

blogRouter.get("/", async (_request, response, next) => {
  try {
    const allPosts = await Blog.find({});
    response.json(allPosts);
  } catch (err) {
    next(err);
  }
});

blogRouter.post("/", async (request, response, next) => {
  const blog = new Blog(request.body);

  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (err) {
    next(err);
  }
});

export default blogRouter;
