import { test, after, beforeEach } from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import supertest from "supertest";
import Blog from "../models/blog.js";
import testData from "./testData.js";
import app from "../app.js";
const api = supertest(app);

test("blogs posts are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are correct number of blog posts", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, testData.blogs.length);
});

test('first blog post is "React patterns"', async () => {
  const response = await api.get("/api/blogs");
  const titles = response.body.map((blog) => blog.title);
  assert(titles.includes("React patterns"));
});

test("database _id is converted to id", async () => {
  const response = await api.get("/api/blogs");
  const ids = response.body.map((blog) => blog.id);
  assert.deepStrictEqual(
    ids,
    testData.blogs.map((blog) => blog._id)
  );
});

test("a valid blog post can be added", async () => {
  const newPost = {
    title: "Test Title",
    author: "Test Author",
    url: "https://example.com",
    likes: 5,
  };
  await api
    .post("/api/blogs")
    .send(newPost)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const response = await api.get("/api/blogs");
  const found = response.body.find(
    (blog) =>
      blog.title === newPost.title &&
      blog.author === newPost.author &&
      blog.url === newPost.url &&
      blog.likes === newPost.likes
  );
  assert(found);
  assert.strictEqual(response.body.length, testData.blogs.length + 1);
});

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let post of testData.blogs) {
    const blog = new Blog(post);
    await blog.save();
  }
});

after(async () => {
  await mongoose.connection.close();
});
