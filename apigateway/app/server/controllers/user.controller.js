const User = require('../models/user.model')
const mongoose = require('mongoose')
const APIError = require('../helpers/APIError')
const httpStatus = require('http-status')
mongoose.Promise = require('bluebird')

const logger = require('../../config/winston')

function userProfile (req, res, next) {
  const {sub, email = ''} = req.user
  if (sub) {
    User.findOne({userId: sub})
      .then((user) => {
        if (user) {
          res.status(200).send()
        } else {
          const newUser = new User({
            userId: sub
          })
          return newUser.save()
            .then((user) => {
              res.status(202).json(user)
            })
        }
      })
      .catch((err) => {
        logger.error(err)
        res.status(500).send()
      })
  } else {
    res.status(404).send()
  }
}

function userProfileUpdate (req, res, next) {
  const {sub} = req.user
  if (sub) {
    User.findOne({userId: sub})
      .then((user) => {
        if (res.body.history) {
          return User.update({_id: user._id, 'history.videoId': {$ne: req.body.history}},
                {$push: {history: {$each: [{videoId: req.body.history}], $slice: -10}}}
              )
        } else if (res.body.bookmark) {
          return User.update({_id: user._id, 'bookmark.videoId': {$ne: req.body.bookmark}},
                      {$push: {bookmark: {videoId: req.body.bookmark}}}
          )
        }
      })
      .then((user) => {
        res.json(200).json(user)
      })
      .catch((err) => {
        logger.error(err)
        res.json(404).send()
      })
  } else {
    res.json(400).send()
  }
}

module.exports = { userProfile, userProfileUpdate }
