const Router = require('koa-router');
const userRoutes = require('./userRoutes');

const router = new Router();

router.get('/ping', async ctx => ctx.body = 'pong');

userRoutes(router)

module.exports = router
