// external import

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

// internal import

import {
  showAllCinema,
  addNewShow,
  showAllShow,
  delShow,
} from "../modules/shows.js?db=test";

// test show all cinemas

Deno.test("show all cinemas", async () => {
  const test = await showAllCinema();
  console.log(test);

  assertEquals(test, [
  { id: 1, name: "cinema1" },
  { id: 2, name: "cinema2" },
  { id: 3, name: "cinema3" }
], "show all cinemas fail");
});

// test create show

Deno.test("create show", async () => {
  const show = {
    time: "2022-03-18 11:00:00",
    name: "test1",
    id: "1",
    cinema: "1",
  };

  const test = await addNewShow(show);
  console.log(test);

  assertEquals(test, "added new show for test1", "create show fail");
});

// test delete show

Deno.test("delete show", async () => {
  const records = await showAllShow();
  const id = records.pop().id;

  const test = await delShow(id);
  console.log(test);

  assertEquals(test, `delete show id ${id}`, "delete movie fail");
});

Deno.test("delete non exists comment", async () => {
  const test = await delShow(0);
  console.log(test);

  assertEquals(
    test,
    "show id 0 not exists",
    "delete non exists show fail",
  );
});
