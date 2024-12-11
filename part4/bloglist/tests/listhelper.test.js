import { test, describe } from "node:test";
import assert from "node:assert";
import listHelper from "../utils/list_helper.js";

test("dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});
