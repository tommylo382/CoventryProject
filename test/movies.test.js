// external import

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

// internal import

import {
  showMovie,
} from "../modules/movies.js?db=test";

// test show movies

Deno.test("show movies", async () => {
  const test = await showMovie();
  console.log(test);

  assertEquals(test, [
    { name: "test1", thumbnail: null },
    { name: "test2", thumbnail: null },
    { name: "test3", thumbnail: null },
  ], "show movies fail");
});
