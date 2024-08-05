const { create, find, show } = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { success, fail } = require('../utils/index')
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env

const register = async (ctx) => {
  const { username, email, password } = ctx.request.body;

  // 生成盐并加密密码
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await create({ username, email, password: hashedPassword });

  return success(user)
}

const login = async (ctx) => {
  const { email, password } = ctx.request.body;

  const user = await find({ email })

  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return fail('Invalid password', 10000)
    } else {
      const token = jwt.sign({ userId: user.userId }, SECRET_KEY, {
        expiresIn: '1d',
      });

      // 设置 Cookie
      ctx.cookies.set('token', token, {
        httpOnly: true, // 确保 cookie 不能通过客户端脚本访问
        secure: process.env.NODE_ENV === 'production', // 在生产环境中使用 secure 选项
        maxAge: 3600000 * 24, // 有效期
      });

      return success({ userId: user.userId, username: user.username, email: user.email })
    }
  } else {
    return fail('User not found')
  }
}

const getUserInfo = async (ctx) => {
  const { userId } = ctx.request.body;

  const user = await show({ userId })

  return success(user)
}

module.exports = {
  register,
  login,
  getUserInfo
}