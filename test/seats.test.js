// external import

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

// internal import

import { bookSeat, checkSeat, showSeat } from "../modules/seats.js?db=test";

// test show seats

Deno.test("show seats", async () => {
  const test = await showSeat(1, "host");
  console.log(test);

  assertEquals(test, {
    show_time: "2022-03-18 11:00:00",
    name: "test1",
    a_row: {
      a1: { name: "host", own: true },
      a2: { name: null },
      a3: { name: null },
      a4: { name: null },
      a5: { name: null },
    },
    b_row: {
      b1: { name: null },
      b2: { name: "admin1" },
      b3: { name: null },
      b4: { name: null },
      b5: { name: null },
    },
    c_row: {
      c1: { name: null },
      c2: { name: null },
      c3: { name: "staff1" },
      c4: { name: null },
      c5: { name: null },
    },
  }, "show seats fail");
});

// test book seats

Deno.test("book seats", async () => {
  const seats = { id: "1", movieId: "1", a1: "host" };
  const test = await bookSeat(seats);
  console.log(test);
  assertEquals(test, "edited seats a1 state for show id 1", "book seats fail");
});

Deno.test("book seats no input", async () => {
  const seats = { id: "1", movieId: "1" };
  const test = await bookSeat(seats);
  console.log(test);
  assertEquals(test, "no changes were made", "book seats no input fail");
});

// test check seats

Deno.test("check seats", async () => {
  const test = await checkSeat(1, "host");
  console.log(test);
  assertEquals(test, 2, "check seats fail");
});
