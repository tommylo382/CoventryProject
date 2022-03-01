// external import

import { Router } from "https://deno.land/x/oak@v6.5.1/mod.ts";
import { Handlebars } from "https://deno.land/x/handlebars/mod.ts";

// internal import



const handle = new Handlebars({ defaultLayout: "" })
const router = new Router()

// render page

router.get("/", async (ctx) => {
    const body = await handle.renderView("home")
    ctx.response.body = body
})

// export

export default router
