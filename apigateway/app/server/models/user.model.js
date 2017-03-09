const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const UserSchemma = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  history: {type: Array,
            default: [{
              videoId: mongoose.Schema.Types.ObjectId,
              watchedAt: {
                type: Date,
                default: Date.now
              }
            }]
          },
  bookmark: {type: Array,
             default: [{
               type: mongoose.Schema.Types.ObjectId,
               markedAt: {
                 type: Date,
                 default: Date.now
               }
             }]
           },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {collection: 'User'});


UserSchemma.statics = {
  validationSchemma: {
    firstName: {
      notEmpty: true,
      errorMessage: 'Invalid First Name. First Name is required'
    },
    lastName: {
      notEmpty: true,
      errorMessage: 'Invalid Last Name. Last name is required'
    },
    password: {
      notEmpty: true,
      isLength: {
        options: [{min: 6}],
        errorMessage: 'Minimum length of password is 6'
      },
      errorMessage: 'Invalid Password Field'
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
