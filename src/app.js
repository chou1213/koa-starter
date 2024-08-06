const Koa = require('koa')
const bodyParser = require('koa-bodyparser');
const { config } = require('dotenv');
const router = require('./routes/index');
const { fail } = require('./utils/index');
const authMiddleware = require('./middlewares/authMiddleware')

config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' })

const app = new Koa();
const port = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;

app
  .use(authMiddleware(SECRET_KEY, { path: [/^\/user/] }))
  .use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      err.status = err.statusCode || err.status || 500;
      ctx.body = fail(err.message)
    }
  })
  .use(bodyParser())
  .use(router.allowedMethods())
  .use(router.routes())
  .listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
