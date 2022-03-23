// external import

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

// internal import

import {
  del,
  login,
  register,
  role,
  showUser,
} from "../modules/accounts.js?db=test";

// test login

Deno.test("login", async () => {
  const acc = {
    userName: "host",
    password: "password",
  };

  const test = await login(acc);
  console.log(test);

  assertEquals(test, "host", "login fail");
});

Deno.test("login with worng user name", async () => {
  const acc = {
    userName: "worngName",
    password: "password",
  };

  const test = await login(acc);
  console.log(test);

  assertEquals(
    test,
    "user worngName not found",
    "login with worng user name fail",
  );
});

Deno.test("login with worng password", async () => {
  const acc = {
    userName: "host",
    password: "worngPassword",
  };

  const test = await login(acc);
  console.log(test);

  assertEquals(
    test,
    "worng password for host",
    "login with worng password fail",
  );
});

// test register

Deno.test("register", async () => {
  const acc = {
    userName: "test",
    password: "password",
  };

  const test = await register(acc);
  console.log(test);

  assertEquals(test, "create account test", "register fail");
});

Deno.test("register staff", async () => {
  const acc = {
    userName: "test_staff",
    password: "password",
    role: "s",
  };

  const test = await register(acc);
  console.log(test);

  assertEquals(test, "create account test_staff", "register staff fail");
  await del("test_staff")
});

Deno.test("registing with already exists username", async () => {
  const acc = {
    userName: "test",
    password: "password",
  };

  const test = await register(acc);
  console.log(test);

  assertEquals(
    test,
    "username test already exists",
    "registing with already exists username fail",
  );
});

// test delete

Deno.test("delete", async () => {
  const test = await del("test");
  console.log(test);

  assertEquals(test, "delete account test", "delete fail");
});

Deno.test("delete non exists account", async () => {
  const test = await del("test");
  console.log(test);

  assertEquals(
    test,
    "username test not exists",
    "delete non exists account fail",
  );
});

// test get role

Deno.test("get role(host)", async () => {
  const test = await role("host");
  console.log(test);

  assertEquals(test, "h", "get role(host) fail");
});

Deno.test("get role(administrator)", async () => {
  const test = await role("admin1");
  console.log(test);

  assertEquals(test, "a", "get role(administrator) fail");
});

Deno.test("get role(staff)", async () => {
  const test = await role("staff1");
  console.log(test);

  assertEquals(test, "s", "get role(staff) fail");
});

Deno.test("get role(user)", async () => {
  const test = await role("user1");
  console.log(test);

  assertEquals(test, null, "get role(user) fail");
});

// test show users

Deno.test("show users", async () => {
  const test = await showUser();
  console.log(test);

  assertEquals(test, [
    { user_name: "admin1", role: "a" },
    { user_name: "host", role: "h" },
    { user_name: "staff1", role: "s" },
    { user_name: "user1", role: null },
  ], "show users fail");
});
