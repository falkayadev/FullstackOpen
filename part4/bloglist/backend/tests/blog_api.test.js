import { test, after, beforeEach, describe, it } from "node:test";

import assert from "node:assert";
import mongoose from "mongoose";
import supertest from "supertest";
import Blog from "../models/blog.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import helper from "./test_helper.js";
import config from "../utils/config.js";
import bcrypt from "bcrypt";
import app from "../app.js";
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialPosts);
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("password", 10);
  const dummyUser = new User({
    username: "testuser",
    name: "Test User",
    passwordHash,
  });
  await dummyUser.save();
});

describe("crud", () => {
  it("create with true token", async () => {
    const user = await User.findOne({ username: "testuser" });
    const userForToken = {
      username: user.username,
      id: user.toJSON().id,
    };
    const token = jwt.sign(userForToken, config.SECRET);
    const newPost = {
      title: "Test Title",
      author: "Test Author",
      url: "https://example.com",
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .send(newPost)
      .set("Authorization", `Bearer ${token}`)
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

  it("create without token", async () => {
    const newPost = {
      title: "Test Title",
      author: "Test Author",
      url: "https://example.com",
      likes: 5,
    };
    await api.post("/api/blogs").send(newPost).expect(401);
  });

  it("update", async () => {
    const existingId = helper.initialPosts[0]["_id"];
    await api
      .put(`/api/blogs/${existingId}`)
      .send({ likes: 100 })
      .expect(200)
      .expect((res) => {
        assert.deepStrictEqual(res.body, {
          ...helper.initialPosts[0],
          likes: 100,
        });
      });
  });

  it("update a non-existing post", async () => {
    const id = await helper.nonExistingId();
    await api.put(`/api/blogs/${id}`).send({ likes: 100 }).expect(404);
  });

  it("delete post has non existing id", async () => {
    const nonExistingId = await helper.nonExistingId();
    await api.delete(`/api/blogs/${nonExistingId}`).expect(404);
  });
});

describe("data consistency", () => {
  it("blogs posts are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("there are correct number of blog posts", async () => {
    const posts = await helper.postsInDb();
    assert.strictEqual(posts.length, helper.initialPosts.length);
  });

  it("database _id is converted to id", async () => {
    const posts = await helper.postsInDb();
    const returnedIds = posts.map((blog) => blog.id);
    const originalIds = helper.initialPosts.map((post) => post._id.toString());
    assert.deepStrictEqual(returnedIds, originalIds);
  });
});

describe("input validation", () => {
  it("blog post without likes is given default value of 0", async () => {
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

  it("blog post title or url properties are missing", async () => {
    const newDeficientPost = {
      author: "Test Author",
      likes: 5,
    };
    await api.post("/api/blogs").send(newDeficientPost).expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});
