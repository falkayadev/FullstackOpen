import { test, beforeEach } from "node:test";
import assert from "node:assert";
import supertest from "supertest";
import helper from "./test_helper.js";
import bcrypt from "bcrypt";
import app from "../app.js";
import User from "../models/user.js";
const api = supertest(app);

test("users length is 1", async () => {
  const users = await helper.usersInDb();
  assert.strictEqual(users.length, 1);
});

test("create a new user", async () => {
  const usersAtStart = await helper.usersInDb();
  const newUser = {
    username: "testuser2",
    name: "Test User",
    password: "password",
  };
  await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const usersAtEnd = await helper.usersInDb();
  assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);
});

test("creation fails with proper statuscode and message if username already taken", async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: "testuser",
    name: "Another User",
    password: "password456",
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(result.body.error, "username must be unique");
  const usersAtEnd = await helper.usersInDb();
  assert.strictEqual(usersAtEnd.length, usersAtStart.length);
});

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("password", 10);
  const dummyUser = new User({ username: "testuser", passwordHash });
  await dummyUser.save();
});
