import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY

// 鉴权中间件
const authMiddleware = async (ctx: Context, next: Next) => {
  const token = ctx.cookies.get('token');

  if (!token) {
    ctx.status = 401;
    ctx.body = { error: 'Unauthorized' };
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    ctx.state.user = decoded;
    await next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = { error: 'Invalid token' };
  }
};

module.exports = authMiddleware
