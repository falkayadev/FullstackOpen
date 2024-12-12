import { test, after, beforeEach } from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import supertest from "supertest";
import Blog from "../models/blog.js";
import helper from "./test_helper.js";
import app from "../app.js";
const api = supertest(app);

test("blogs posts are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are correct number of blog posts", async () => {
  const posts = await helper.postsInDb();
  assert.strictEqual(posts.length, helper.initialPosts.length);
});

test('first blog post is "React patterns"', async () => {
  const posts = await helper.postsInDb();
  const titles = posts.map((blog) => blog.title);
  assert(titles.includes("React patterns"));
});

test("database _id is converted to id", async () => {
  const posts = await helper.postsInDb();
  const returnedIds = posts.map((blog) => blog.id);
  const originalIds = helper.initialPosts.map((post) => post._id.toString());
  assert.deepStrictEqual(returnedIds, originalIds);
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

  const posts = await helper.postsInDb();
  const found = posts.find(
    (blog) =>
      blog.title === newPost.title &&
      blog.author === newPost.author &&
      blog.url === newPost.url &&
      blog.likes === newPost.likes
  );
  assert(found);
  assert.strictEqual(posts.length, helper.initialPosts.length + 1);
});

test("blog post without likes is given default value of 0", async () => {
  const newPostWithoutLikes = {
    title: "Test Title",
    author: "Test Author",
    url: "https://example.com",
  };
  await api
    .post("/api/blogs")
    .send(newPostWithoutLikes)
    .expect(201)
    .expect("Content-Type", /application\/json/)
    .expect((res) => {
      assert.strictEqual(res.body.likes, 0);
    });
});

test("blog post title or url properties are missing", async () => {
  const newDeficientPost = {
    author: "Test Author",
    likes: 5,
  };
  await api.post("/api/blogs").send(newDeficientPost).expect(400);
});

test("delete post has non existing id", async () => {
  const nonExistingId = await helper.nonExistingId();
  await api.delete(`/api/blogs/${nonExistingId}`).expect(404);
});

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialPosts);
});

after(async () => {
  await mongoose.connection.close();
});
