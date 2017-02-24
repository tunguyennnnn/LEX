const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const UserSchemma = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {collection: 'User'});


UserSchemma.statics = {
  validationSchemma: {
    username: {
      notEmpty: true,
      isLength: {
        options: [{min: 4, max: 20}],
      },
      errorMessage: 'Invalid Username Field'
    },
    password: {
      notEmpty: true,
      errorMessage: 'Invalid Password'
    },
    email: {
      notEmpty: true,
      isEmail: {
        errorMessage: 'Invalid Email Field'
      }
    }
  }
}


module.exports = mongoose.model('User', UserSchemma);
