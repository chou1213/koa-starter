const prisma = require('./prisma')
const { success, fail } = require('../utils/index')
const bcrypt = require('bcryptjs');

const list = async (ctx) => {
  const {
    keyword,
    pageSize,
    pageIndex,
  } = ctx.request.query

  const where = {
  }

  if (keyword) {
    where.OR = [
      {
        username: {
          contains: keyword,
        },
      },
      {
        email: {
          contains: keyword,
        },
      },
    ]
  }

  const listData = await prisma.user.findMany({
    where: {
      ...where,
    },
    skip: parseInt(pageSize, 10) * (parseInt(pageIndex, 10) - 1),
    take: parseInt(pageSize, 10),
  })

  const total = await prisma.user.count({ where })

  return success({
    list: listData,
    total,
  })
}

const all = async (ctx) => {
  const { keyword } = ctx.request.query
  const where = {}

  if (keyword) {
    where.OR = [
      {
        username: {
          contains: keyword,
        },
      },
      {
        email: {
          contains: keyword,
        },
      },
      {
        password: {
          contains: keyword,
        },
      },
    ]
  }

  const allData = await prisma.user.findMany({
    where: {
      ...where,
    },
  })

  return success(allData)
}

const show = async ({ userId }) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      userId: parseInt(userId, 10),
    },
  })

  return user;
}

const destroy = async (ctx) => {
  const { userId } = ctx.request.body

  const result = await prisma.user.findFirst({
    where: {
      userId,
    },
  });

  if (!result) {
    return fail('This user does not exists', 10005)
  }

  await prisma.user.findFirstOrThrow({
    where: {
      userId,
    },
  })

  const user = await prisma.user.delete({
    where: {
      userId,
    },
  })

  return success(user)
}

const update = async (ctx) => {
  const {
    userId,
    username,
    email,
    password,
  } = ctx.request.body

  await prisma.user.findFirstOrThrow({
    where: {
      ldyAppId,
      userId,
    },
  })

  const user = await prisma.user.update({
    where: {
      userId,
    },
    data: {
      username,
      email,
      password,
    },
  })

  return success(user)
}

const create = async ({ username, email, password }) => {
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  })

  return user
}

const find = async ({ email }) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      email
    },
  })

  return user
}

module.exports = {
  show,
  all,
  list,
  create,
  destroy,
  update,
  find
}
