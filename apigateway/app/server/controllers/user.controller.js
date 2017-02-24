const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const app = require('../../config/express');
const mongoose = require('mongoose');

function authenticate(req, res, next){
  let {username = '', password=''} = req.body;

  User.findOne({
    username: username
  }, function(err, user){
    if (err) throw err;
    if (!user){
      res.json({success: false, message: 'Authentication failed. User not found.'});

    }else if (user){
      if (user.password !== password){
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      }else{
        var token = jwt.sign(user, "tusamjavier", {
          expiresIn : 60*60*24// expires in 24 hours
        });
        res.json({
          success: true,
          message: 'Thanks for logging in!!!',
          token: token
        });
      }
    }
  });
}


function getUsers(req, res, next){

}

function createUser(req, res, next){
  req.checkBody(User.validationSchemma);
  req.getValidationResult()
    .then(function(result){
            if (! result.isEmpty()){
              res.json({success: false, message: result.array()});
            }else{
              let {username, password, email} = req.body;
              let newUser = new User({username, password, email});
              newUser.save(function(err){
                if (err){
                  res.json({success: false, message: err});
                }
                else{
                  res.json({success: true, message: 'Thank you for signing up!'});
                  next();
                }
              });
            }
          });
}

function updateUser(req, res, next){
  let userId = req.params.user_id;
  if (mongoose.Types.ObjectId.isValid(userId)){
    User.findById(userId, function(err, user){
      if (err){
        res.json({success: false, message: "Error occured"});
      }else{
        if (!user){
          res.json({success: false, message: "Can't find the user"});
        }else{
          console.log(user)
          let {username=user.username, password=user.password, email=user.email} = req.body;
          user.username = username;
          user.password = password;
          user.email = email;
          user.save(function(err){
            if (err){
              res.json({success: false, message: err});
            }
            else{
              res.json({success: true, message: "Updated"});
            }
          });
        }
      }
    });
  }
  else{
    //wrong type of id
    res.json({success: false, message: userId})
  }

}

function userProfile(req, res, next){

}

module.exports = { authenticate, getUsers, createUser, updateUser, userProfile }
