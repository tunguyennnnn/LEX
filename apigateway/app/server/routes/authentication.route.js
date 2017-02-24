const express = require('express');
const UserController = require('../controllers/user.controller');

const router = express.Router();

router.route('/')
  .post(UserController.authenticate)

module.exports = router
