const express = require('express');
const UserController = require('../controllers/user.controller');
const router = express.Router();

router.route('/')
  .get(UserController.getUsers)
  .post(UserController.createUser)

router.route('/:user_id')
  .get(UserController.userProfile)
  .put(UserController.updateUser)


module.exports = router;
