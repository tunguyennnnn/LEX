const User = require('../models/user.model')
const app = require('../../config/express')
const mongoose = require('mongoose')
const APIError = require('../helpers/APIError')
const httpStatus = require('http-status')

function userProfile (req, res, next) {
  console.log(req.user)
  console.log('user id is:', req.user.sub)

  // TODO
  // if req.user.sub in db
    // return user schema using status: httpStatus.OK
  // else
    // return create new user and return it using status: httpStatus.CREATED
  //
  res.status(httpStatus.CREATED).json({
    favourites: [{id: 'q11afdjs1', title: 'hello world'}, {id: 'asdffdjs1', title: 'go world'}],
    bookmarks: [{id: 'q11afdjs1', timestamp: 1234432}],
    history: [{id: 'q11afdjs1', title: 'hello world'}]
  })

  // User.findOne({id: req.user.sub})
  //   .then(function(user){
  //   })
  //   .catch(function(err){
  //     res.status(500)
  //   })
}

function userProfileUpdate (req, res, next) {
  res.status(httpStatus.NO_CONTENT).send()
// //TODO only update bookmark, favs and history
//   let userId = req.params.user_id
//   if (mongoose.Types.ObjectId.isValid(userId)) {
//     let token = req.body.token || req.query.token || req.headers['x-access-token']
//     let {email = '', password = ''} = req.body
//     if (token) {
//       jwt.verify(token, 'tusamjavier', function (err, decoded) {
//         if (err) {
//           res.status(401).send({success: false, message: 'wrong token!'})
//         } else {
//           email = decoded._doc.email
//           password = decoded._doc.password
//         }
//       })
//     }
//     User.findById(userId)
//       .then((user) => {
//         if (email === user.email && password === user.password) {
//           if (req.body.firstName || req.body.lastName || req.body.newPassword) {
//             let {firstName = user.firstName, lastName = user.lastName, newPassword = user.password} = req.body
//             user.firstName = firstName
//             user.lastName = lastName
//             user.password = newPassword
//             user.save()
//                 .then((user) => {
//                   res.status(200).json(user)
//                 })
//           } else {
//             if (req.body.history) {
//               User.update({_id: user._id, 'history.videoId': {$ne: req.body.history}},
//                 {$push: {history: {$each: [{videoId: req.body.history}], $slice: -10}}}
//               )
//               .then((user) => {
//                 res.json(user)
//               })
//               .catch((err) => {
//                 res.status(400).json({success: false, message: err})
//               })
//             } else if (req.body.bookmark) {
//               User.update({_id: user._id, 'bookmark.videoId': {$ne: req.body.bookmark}},
//                 {$push: {bookmark: {videoId: req.body.bookmark}}}
//               )
//               .then((user) => {
//                 res.json(user)
//               })
//               .catch(err => { res.status(400).json(err) })
//             }
//           }
//         } else {
//           res.status(404)
//           res.json({success: false, message: 'Incorrect email or password'})
//         }
//       })
//       .catch(function (err) {
//         res.json(err)
//       })
//   } else {
//     res.json('dasdads')
//   }
}

module.exports = { userProfile, userProfileUpdate }
