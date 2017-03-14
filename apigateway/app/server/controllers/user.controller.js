const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const app = require('../../config/express');
const mongoose = require('mongoose');
const APIError = require('../helpers/APIError');
const httpStatus = require('http-status');


function authenticate(req, res, next){
  let {email = '', password=''} = req.body;
  User.findOne({email: email})
    .then(function(user){
      if (!user){
        res.status(404).json({success: false, message: 'Cannot find the user'});
      }else if (user){
        if (user.password !== password){
          res.status(400).json({ success: false, message: 'Wrong password' });
        }else{
          var token = jwt.sign(user, "tusamjavier", {
            expiresIn : 60*60*24// expires in 24 hours
          });
          res.status(200).json({
            success: true,
            message: 'Thanks for logging in!!!',
            token: token
          });
          next();
        }
      }
    })
    .catch(function(err){
      res.status(500)
    })
}


function getUsers(req, res, next){
  User.find()
    .then(function(users){
      res.status(200).json(users);
      next();
    })
    .catch(function(err){
      res.status(500)
    })
}

function createUser(req, res, next){
  req.checkBody(User.validationSchemma);
  req.getValidationResult()
    .then(function(result){
      if (!result.isEmpty()){
        res.status(400).json({success: false, message: result.array()});
      }
      else{
        let {firstName, lastName, password, email} = req.body;
        let newUser = new User({firstName, lastName, password, email});
        newUser.save(function(err){
          if (err){
            res.status(400).json({success: false, message: err.errmsg});
          }
          else{
            res.status(200).json({success: true, message: 'Thank you for signing up!'});
            next();
          }
        });
      }
    });
}

function updateUser(req, res, next){
  let userId = req.params.user_id;
  if (mongoose.Types.ObjectId.isValid(userId)){
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    let {email='', password=''} = req.body;
    if (token){
      jwt.verify(token, "tusamjavier", function(err, decoded) {
        if (err){
          res.status(401).send({success: false, message: 'wrong token!'});
        }else{
          email = decoded._doc.email;
          password = decoded._doc.password;
        }

      });
    }
    User.findById(userId)
      .then(function(user){
        if (email === user.email && password === user.password){
          if (req.body.firstName || req.body.lastName || req.body.newPassword){
              let {firstName = user.firstName, lastName = user.lastName, newPassword = user.password} = req.body;
              user.firstName = firstName;
              user.lastName = lastName;
              user.password = newPassword;
              user.save()
                .then(function(user){
                  res.status(200).json(user)
                })
          }
          else{
            if (req.body.history){
              User.update({_id: user._id, 'history.videoId': {$ne: req.body.history}},
                {$push: {history: {$each: [{videoId: req.body.history}], $slice: -10}}}
              )
              .then(function(user){
                res.json(user);
              })
              .catch(function(err){
                res.status(400).json({success: false, message: err})
              });

            }
            else if (req.body.bookmark){
              User.update({_id: user._id, 'bookmark.videoId': {$ne: req.body.bookmark}},
                {$push: {bookmark: {videoId: req.body.bookmark}}}
              )
              .then(function(user){
                res.json(user);
              })
              .catch(err => {res.status(400).json(err)});
            }
          }
        }else{
          res.status(404);
          res.json({success: false, message: 'Incorrect email or password'});
        }
      })
      .catch(function(err){
        res.json(err);
      })
  }
  else{
    res.json("dasdads")
  }
}

function userProfile(req, res, next){
  let userId = req.params.user_id;
  if (mongoose.Types.ObjectId.isValid(userId)){
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    let {email='', password=''} = req.body;
    if (token){
      jwt.verify(token, "tusamjavier", function(err, decoded) {
        if (err){
          res.status(401).send({success: false, message: 'wrong token!'});
        }else{
          email = decoded._doc.email;
          password = decoded._doc.password;
        }

      });
    }
    User.findById(userId)
      .then(function(user){
        if (email === user.email && password === user.password){
          res.status(200).json({success: true, message: user})
        }
        else{
          res.status(401);
        }
      })
      .catch(err => res.status(500).json(err));
  }
}

module.exports = { authenticate, getUsers, createUser, updateUser, userProfile }
