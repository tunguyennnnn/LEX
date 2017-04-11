const express = require('express')
const UserController = require('../controllers/user.controller')
const router = express.Router()
const authCheck = require('../../config/auth')

router.route('/')
  .all(authCheck)
  .get(UserController.userProfile)
  .put(UserController.userProfileUpdate)

module.exports = router
