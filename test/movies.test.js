// external import

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

// internal import

import { showMovie, showMovieDetail } from "../modules/movies.js?db=test";

// test show movies

Deno.test("show movies", async () => {
  const test = await showMovie();
  console.log(test);

  assertEquals(test, [
    {
      id: 1,
      name: "test1",
      thumbnail: null,
      cinemas: [{ name: "cinema1" }, { name: "cinema2" }],
    },
    { id: 2, name: "test2", thumbnail: null, cinemas: [{ name: "cinema3" }] },
    { id: 3, name: "test3", thumbnail: null, cinemas: [] },
  ], "show movies fail");
});

// test show movie detail

Deno.test("show movie detail", async () => {
  const test = await showMovieDetail("1");
  console.log(test);

  assertEquals(test, {
  id: 1,
  name: "test1",
  thumbnail: null,
  description: "sample record",
  cinemas: [
    { name: "cinema1", shows: [ { show_time: "2022-03-18 11:00:00" } ] },
    { name: "cinema2", shows: [ { show_time: "2022-03-18 11:30:00" } ] }
  ]
}, "show movie detail fail");
});
