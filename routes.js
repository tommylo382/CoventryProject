// external import

import { Router } from "https://deno.land/x/oak@v6.5.1/mod.ts";
import { Handlebars } from "https://deno.land/x/handlebars/mod.ts";

// internal import

import { del, login, register, role, showUser } from "./modules/accounts.js";
import {
  addMovie,
  delMovie,
  editMovie,
  findMovie,
  showMovie,
  showMovieDetail,
} from "./modules/movies.js";
import { addComment, delComment, showComment } from "./modules/comments.js";
import { showAllCinema, addNewShow, delShow } from "./modules/shows.js";

const handle = new Handlebars({ defaultLayout: "" });
const router = new Router();

// render page

router.get("/", async (ctx) => {
  const authorised = ctx.cookies.get("authorised");
  const host = ctx.cookies.get("host");
  const admin = ctx.cookies.get("admin");
  const staff = ctx.cookies.get("staff");
  const movies = await showMovie();
  const data = { authorised, host, admin, staff, movies };
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
    console.log(data);
    const body = await handle.renderView("users", data);
    ctx.response.body = body;
  }
});

router.get("/detail", async (ctx) => {
  const authorised = ctx.cookies.get("authorised");
  const staff = ctx.cookies.get("staff");
  const params = ctx.request.url.searchParams;
  const id = params.get("id");
  const movie = await showMovieDetail(id);
  const comments = await showComment(id);
  const data = { authorised, staff, movie, comments };
  const body = await handle.renderView("detail", data);
  ctx.response.body = body;
});

router.get("/search", async (ctx) => {
  const authorised = ctx.cookies.get("authorised");
  const params = ctx.request.url.searchParams;
  const type = params.get("type");
  const keyword = params.get("keyword");
  const movies = await findMovie(type, keyword);
  const data = { authorised, movies };
  const body = await handle.renderView("search", data);
  ctx.response.body = body;
});

router.get("/edit", async (ctx) => {
  const staff = ctx.cookies.get("staff");
  if (staff === undefined) {
    ctx.response.redirect("/");
  } else {
    const params = ctx.request.url.searchParams;
    const id = params.get("id");
    const movie = await showMovieDetail(id);
    const data = { movie };
    const body = await handle.renderView("edit", data);
    ctx.response.body = body;
  }
});

router.get("/add_movie", async (ctx) => {
  const staff = ctx.cookies.get("staff");
  if (staff === undefined) {
    ctx.response.redirect("/");
  } else {
    const body = await handle.renderView("add_movie");
    ctx.response.body = body;
  }
});

router.get("/add_show", async (ctx) => {
  const staff = ctx.cookies.get("staff");
  if (staff === undefined) {
    ctx.response.redirect("/");
  } else {
    const params = ctx.request.url.searchParams;
    const id = params.get("id");
    const movie = await showMovieDetail(id);
    const cinemas = await showAllCinema()
    const data = { movie, cinemas };
    const body = await handle.renderView("add_show", data);
    ctx.response.body = body;
  }
});

router.get("/show", async (ctx) => {
  const authorised = ctx.cookies.get("authorised");
  const staff = ctx.cookies.get("staff");
  if (authorised === undefined) {
    ctx.response.redirect("/");
  } else {
    const params = ctx.request.url.searchParams;
    const id = params.get("id");
    const movieId = params.get("movieId");
    const data = { authorised, staff, id, movieId };
    const body = await handle.renderView("show", data);
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
  const message = await register(obj);
  if (message === `username ${obj.userName} already exists`) {
    ctx.response.redirect("/register");
  } else if (authorised !== undefined) {
    ctx.response.redirect("/");
  } else {
    ctx.response.redirect("/login");
  }
});

router.post("/search", async (ctx) => {
  const body = ctx.request.body({ type: "form" });
  const value = await body.value;
  const obj = Object.fromEntries(value);
  ctx.response.redirect(`/search?type=${obj.type}&keyword=${obj.keyword}`);
});

router.post("/edit", async (ctx) => {
  const body = ctx.request.body({ type: "form-data" });
  const value = await body.value.read();
  await editMovie(value);
  ctx.response.redirect(`/detail?id=${value.fields.id}`);
});

router.post("/add_movie", async (ctx) => {
  const body = ctx.request.body({ type: "form-data" });
  const value = await body.value.read();
  await addMovie(value);
  ctx.response.redirect("/");
});

router.post("/add_comment", async (ctx) => {
  const body = ctx.request.body({ type: "form" });
  const value = await body.value;
  const obj = Object.fromEntries(value);
  await addComment(obj);
  ctx.response.redirect(`/detail?id=${obj.movieId}`);
});

router.post("/add_show", async (ctx) => {
  const body = ctx.request.body({ type: "form" });
  const value = await body.value;
  const obj = Object.fromEntries(value);
  await addNewShow(obj);
  ctx.response.redirect(`/detail?id=${obj.id}`);
});

// button functions

router.get("/logout", (ctx) => {
  ctx.cookies.delete("authorised");
  ctx.cookies.delete("host");
  ctx.cookies.delete("admin");
  ctx.cookies.delete("staff");
  ctx.response.redirect("/");
});

router.get("/delete_user", async (ctx) => {
  const params = ctx.request.url.searchParams;
  const userName = params.get("name");
  await del(userName);
  ctx.response.redirect("/users");
});

router.get("/delete_movie", async (ctx) => {
  const params = ctx.request.url.searchParams;
  const id = params.get("id");
  await delMovie(id);
  ctx.response.redirect("/");
});

router.get("/delete_comment", async (ctx) => {
  const params = ctx.request.url.searchParams;
  const id = params.get("id");
  const movieId = params.get("movieId");
  await delComment(id);
  ctx.response.redirect(`/detail?id=${movieId}`);
});

router.get("/delete_show", async (ctx) => {
  const params = ctx.request.url.searchParams;
  const id = params.get("id");
  const movieId = params.get("movieId");
  await delShow(id);
  ctx.response.redirect(`/detail?id=${movieId}`);
});

// export router

export default router;
