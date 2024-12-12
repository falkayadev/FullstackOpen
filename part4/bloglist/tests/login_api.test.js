import { test, beforeEach } from "node:test";
import assert from "node:assert";
import supertest from "supertest";
import helper from "./test_helper.js";
import app from "../app.js";
import User from "../models/user.js";
const api = supertest(app);
import bcrypt from "bcrypt";

test("login succeeds with correct credentials", async () => {
  const user = {
    username: "testuser",
    password: "password",
  };

  await api.post("/api/login").send(user).expect(200);
});

test("login fails with incorrect credentials", async () => {
  const user = {
    username: "testuser",
    password: "wrong",
  };

  await api.post("/api/login").send(user).expect(401);
});

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("password", 10);
  const dummyUser = new User({ username: "testuser", passwordHash });
  await dummyUser.save();
});
