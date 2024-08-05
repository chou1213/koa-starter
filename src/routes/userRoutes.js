const { handle } = require('../utils/index');
const { register, login, getUserInfo } = require('../controllers/userController');

function userRoutes(router) {
  router.post('/user/register', handle(register))
  router.post('/user/login', handle(login))
  router.post('/user/getUserInfo', handle(getUserInfo))
}
module.exports = userRoutes

