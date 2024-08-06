const Koa = require('koa');
const fs = require('fs');
const bodyParser = require('koa-bodyparser');
const { config } = require('dotenv');
const { fail } = require('./utils/index');
const authMiddleware = require('./middlewares/authMiddleware')

const defaultEnvPath = [];
const envPath = `.env.${process.env.NODE_ENV}`;

// 检查特定环境的 .env 文件是否存在
if (fs.existsSync(envPath)) {
  defaultEnvPath.push(envPath)
}

config({ path: defaultEnvPath, override: true })

const app = new Koa();
const port = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;

const router = require('./routes/index');

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
