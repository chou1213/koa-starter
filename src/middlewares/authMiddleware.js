const jwt = require('jsonwebtoken');
const { fail } = require('../utils/index');

const SECRET_KEY = process.env.SECRET_KEY

// 鉴权中间件
const authMiddleware = (secret, options = {}) => {
  return async (ctx, next) => {
    const { path = [] } = options;
    const requiresAuth = path.some(regex => regex.test(ctx.url));
    console.log(requiresAuth)

    if (requiresAuth) {
      const token = ctx.cookies.get('token');

      console.log(token)
      if (!token) {
        ctx.status = 401;
        ctx.body = fail('Unauthorized', 10000)
      } else {
        try {
          const decoded = jwt.verify(token, SECRET_KEY);
          console.log(decoded)
          ctx.state.user = decoded;
          await next();
        } catch (err) {
          ctx.status = 401;
          ctx.body = fail('Invalid token', 10000)
        }
      }
    } else {
      await next();
    }
  };
};

module.exports = authMiddleware
