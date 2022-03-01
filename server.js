// external import

import { Application } from "https://deno.land/x/oak@v6.5.1/mod.ts";
import { parse } from "https://deno.land/std/flags/mod.ts";
import { Handlebars } from "https://deno.land/x/handlebars/mod.ts";

// internal import

import router from "./routes.js";

const port = 8080
const app = new Application()
const handle = new Handlebars({ defaultLayout: "" })

app.use(router.routes())
app.use(router.allowedMethods())

// tracker

app.use(async (ctx, next) => {
    try {
        console.log(ctx.request.url.href)
        await next()
    } catch (err) {
        console.log(err)
    }
})

// content

app.use(async (ctx, next) => {
    const root = `${Deno.cwd()}/public`
    try {
        await ctx.send({root})
    } catch {
        next()
    }
})

// not find

app.use(async (ctx) => {
    try {
        const body = await handle.renderView("404")
        ctx.respond.body = body
    } catch (err) {
        console.log(err)
    }
})

// listener

app.addEventListener("listen", ({ port }) => {
  console.log(`listening on port: ${port}`);
});
await app.listen({port})
