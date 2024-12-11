import { test, describe } from "node:test";
import assert from "node:assert";
import listHelper from "../utils/list_helper.js";
import testData from "./testData.js"

test("dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});
describe("total likes", () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });
  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes([testData.blogs[0]]);
    assert.strictEqual(result, 7);
  });
  test("when all posts have likes", () => {
    const result = listHelper.totalLikes(testData.blogs);
    assert.strictEqual(result, 36);
  });
});
