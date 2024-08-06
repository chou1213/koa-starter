const Router = require('koa-router');
const userRoutes = require('./userRoutes');
const fileRoutes = require('./fileRoutes');

const router = new Router();

router.get('/ping', async ctx => ctx.body = 'pong');

userRoutes(router)
fileRoutes(router)

module.exports = router
