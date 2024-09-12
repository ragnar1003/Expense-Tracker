const express = require('express')
const { LoginController, RegisterController } = require('../controller/userController')

//router object
const router = express.Router()
//routers
//POST || LOGIN
router.post('/login',LoginController)

//POST || REGISTER
router.post('/register',RegisterController)
module.exports = router
