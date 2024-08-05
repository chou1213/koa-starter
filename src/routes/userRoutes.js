const { list } = require('../models/user');
const { handle } = require('../utils/index');

function userRoutes(router) {
  router.get('/user/list', handle(list))
}
module.exports = userRoutes

