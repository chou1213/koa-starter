const success = (data) => {
  return {
    message: 'success',
    code: 200,
    data
  }
}

const fail = (message, code, data) => {
  return {
    message,
    code,
    data
  }
}

const handle = (fn) => async (ctx) => {
  const body = await fn(ctx);
  ctx.body = body;
}

module.exports = {
  success,
  fail,
  handle
}