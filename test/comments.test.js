// external import

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

// internal import

import {
  addComment,
  delComment,
  showComment,
  showAllComment,
} from "../modules/comments.js?db=test";

// test show comments

Deno.test("show comments", async () => {
  let test = await showComment(1);
  console.log(test);

  assertEquals(test, [
    { id: 1, name: "user1", rating: 3, review: "sample record" },
    { id: 2, name: "staff1", rating: 5, review: "sample record" },
  ], "show comments fail");

  test = await showComment(2);
  console.log(test);

  assertEquals(test, [{
    id: 3,
    name: "user1",
    rating: 3,
    review: "sample record",
  }], "show comments fail");

  test = await showComment(3);
  console.log(test);

  assertEquals(test, [], "show comments fail");
});

// test create comment

Deno.test("create comment", async () => {
  const comment = {
    movieId: "1",
    name: "user1",
    rating: 5,
    review: "test",
  };

  const test = await addComment(comment);
  console.log(test);

  assertEquals(test, "user1 created a comment", "create comment fail");
});

// test delete comment

Deno.test("delete comment", async () => {
  const records = await showAllComment();
  const id = records.pop().id;

  const test = await delComment(id);
  console.log(test);

  assertEquals(test, `delete comment id ${id}`, "delete movie fail");
});

Deno.test("delete non exists comment", async () => {
  const test = await delComment(0);
  console.log(test);

  assertEquals(
    test,
    "comment id 0 not exists",
    "delete non exists comment fail",
  );
});
