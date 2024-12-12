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
  const blog = new Blog({ ...request.body, likes: request.body.likes || 0 });

  try {
    if (request.body.title === undefined || request.body.url === undefined) {
      return response.status(400).json({ error: "title or url missing" });
    } else {
      const savedBlog = await blog.save();
      response.status(201).json(savedBlog);
    }
  } catch (err) {
    next(err);
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

export default blogRouter;
