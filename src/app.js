const Koa = require('koa')
const bodyParser = require('koa-bodyparser');
const { config } = require('dotenv');
const router = require('./routes/index');

config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' })

const app = new Koa();
const port = process.env.PORT || 3000;

app
  .use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      err.status = err.statusCode || err.status || 500;
      throw err;
    }
  })
  .use(bodyParser())
  .use(router.allowedMethods())
  .use(router.routes())
  .listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
