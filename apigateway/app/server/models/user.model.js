const Promise = require('bluebird')
const mongoose = require('mongoose')
const httpStatus = require('http-status')
const APIError = require('../helpers/APIError')
mongoose.Promise = Promise

const UserSchemma = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  //email: {type: String, default: ''},
  history: {
    type: [{
      videoId: mongoose.Schema.Types.ObjectId,
      watchedAt: {
        type: Date,
        default: Date.now
      }
    }],
    default: []
  },
  bookmark: {
    type: [{
      videoId: mongoose.Schema.Types.ObjectId,
      markedAt: {
        type: Date,
        default: Date.now
      }
    }],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {collection: 'User'})

UserSchemma.statics = {
  validationSchemma: {
    email: {
      notEmpty: true,
      isEmail: {
        errorMessage: 'Invalid Email Field'
      }
    }
  }
}

module.exports = mongoose.model('User', UserSchemma)
