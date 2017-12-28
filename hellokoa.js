const Koa = require("koa");

const app = new Koa();

app.use(async (ctx, next) => {
    ctx.body = "Hello Koa2.x";
});

app.listen(3000);

console.log('[demo] start hello koa2.x starting on port 3000:');