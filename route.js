const Koa = require("koa");
const FS = require("fs");
const Router = require("koa-router");

const app = new Koa();

let home = new Router();
let page = new Router();
let router = new Router();

// 子路由1
home.get('/', async (ctx , next) => {
    let html = `
        <ul>
          <li><a href="/page/helloworld">/page/helloworld</a></li>
          <li><a href="/page/404">/page/404</a></li>
        </ul>
    `
    ctx.body = html;
})

// 子路由2
page.get('/404', async (ctx, next) => {
    ctx.body = '404 page！';
}).get('/helloworld', async (ctx, next) => {
    ctx.body = 'helloworld page!';
})

// 装载所有子路由
router.use('/', home.routes(), home.allowedMethods())
/**
 * 解析：Page路径下的请求全部转发到子路由 page上 
 * 即：
 * http://localhost:3000/page/404
 * http://localhost:3000/page/helloworld
 */
router.use('/page', page.routes(), page.allowedMethods())


// 加载路由中间件
app.use(router.routes())
    .use(router.allowedMethods())

app.listen(3000, () => {
  console.log('[demo] route-use-middleware is starting at port 3000')
})

