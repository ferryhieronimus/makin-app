const LoginController = require('../controllers/LoginController')
const loginRouter = require("express").Router();

loginRouter.post('/', LoginController.login)

module.exports = loginRouter