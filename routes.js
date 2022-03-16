// external import

import { Router } from "https://deno.land/x/oak@v6.5.1/mod.ts";
import { Handlebars } from "https://deno.land/x/handlebars/mod.ts";

// internal import

import { login, register, role, showUser, del } from "./modules/accounts.js";

const handle = new Handlebars({ defaultLayout: "" });
const router = new Router();

// render page

router.get("/", async (ctx) => {
  const authorised = ctx.cookies.get("authorised");
  const host = ctx.cookies.get("host");
  const admin = ctx.cookies.get("admin");
  const staff = ctx.cookies.get("staff");
  const data = { authorised, host, admin, staff };
  console.log(data);
  const body = await handle.renderView("home", data);
  ctx.response.body = body;
});

router.get("/login", async (ctx) => {
  const authorised = ctx.cookies.get("authorised");
  if (authorised !== undefined) {
    ctx.response.redirect("/");
  } else {
    const body = await handle.renderView("login");
    ctx.response.body = body;
  }
});

router.get("/register", async (ctx) => {
  const authorised = ctx.cookies.get("authorised");
  const admin = ctx.cookies.get("admin");
  if (authorised !== undefined && admin === undefined) {
    ctx.response.redirect("/");
  } else {
    const data = { admin };
    const body = await handle.renderView("register", data);
    ctx.response.body = body;
  }
});

router.get("/users", async (ctx) => {
  const host = ctx.cookies.get("host");
  if (host === undefined) {
    ctx.response.redirect("/");
  } else {
    const users = await showUser();
    const data = { users };
    console.log(data)
    const body = await handle.renderView("users", data);
    ctx.response.body = body;
  }
});

// process form data

router.post("/login", async (ctx) => {
  const body = ctx.request.body({ type: "form" });
  const value = await body.value;
  const obj = Object.fromEntries(value);
  const authorised = await login(obj);
  if (
    authorised === `user ${obj.userName} not found` ||
    authorised === `worng password for ${obj.userName}`
  ) {
    ctx.response.redirect("/login");
  } else {
    ctx.cookies.set("authorised", authorised);

    const currRole = await role(authorised);
    switch (currRole) {
      case "h":
        ctx.cookies.set("host", true);
        /* falls through */
      case "a":
        ctx.cookies.set("admin", true);
        /* falls through */
      case "s":
        ctx.cookies.set("staff", true);
    }

    ctx.response.redirect("/");
  }
});

router.post("/register", async (ctx) => {
  const authorised = ctx.cookies.get("authorised");
  const body = ctx.request.body({ type: "form" });
  const value = await body.value;
  const obj = Object.fromEntries(value);
  console.log(obj);
  const message = await register(obj);
  if (message === `username ${obj.userName} already exists`) {
    ctx.response.redirect("/register");
  } else if (authorised !== undefined) {
    ctx.response.redirect("/");
  } else {
    ctx.response.redirect("/login");
  }
});

// button functions

router.get("/logout", (ctx) => {
  ctx.cookies.delete("authorised");
  ctx.cookies.delete("host");
  ctx.cookies.delete("admin");
  ctx.cookies.delete("staff");
  ctx.response.redirect("/");
});

router.get("/delete", (ctx) => {
  const params = ctx.request.url.searchParams
  const userName = params.get("name")
  del(userName)
  ctx.response.redirect("/users");
});

// export router

export default router;
