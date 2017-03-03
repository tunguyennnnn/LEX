const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const app = require('../../config/express');
const mongoose = require('mongoose');

function authenticate(req, res, next){
  let {email = '', password=''} = req.body;
  console.log(req.body)
  User.findOne({
    email:email
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
              let {firstName, lastName, password, email} = req.body;
              let newUser = new User({firstName, lastName, password, email});
              newUser.save(function(err){
                if (err){
                  res.json({success: false, message: err.errmsg});
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
  // if (mongoose.Types.ObjectId.isValid(userId)){
  //   let token = req.body.token || req.query.token || req.headers['x-access-token'];
  //   let {email='', password=''} = req.headers;
  //   if (token){
  //     jwt.verify(token, "tusamjavier", function(err, decoded) {
  //       if (err){
  //         res.status(401).send({success: false, message: 'wrong token!'});
  //       }else{
  //         let {email, password} = decoded.doc;
  //       }
  //
  //     });
  //   }
  //   User.findById(userId)
  //     .then(function(user){
  //       if (email === user.email && password===user.password){
  //
  //       }else{
  //         res.status(404);
  //         res.json({success: false, message: 'Incorrect email or password'});
  //       }
  //     })
  //
  // }

  // let userId = req.params.user_id;
  // if (mongoose.Types.ObjectId.isValid(userId)){
  //   User.findById(userId, function(err, user){
  //     if (err){
  //       res.json({success: false, message: "Error occured"});
  //     }else{
  //       if (!user){
  //         res.json({success: false, message: "Can't find the user"});
  //       }else{
  //         let {firstName, lastName, password, newPassword} = req.body;
  //         if (password && password === user.password){
  //           if (firstName){
  //             user.firstName = firstName;
  //           }
  //           if (lastName){
  //             user.lastName = lastName;
  //           }
  //           if (newPassword){
  //             user.password = newPassword;
  //           }
  //           user.save(function(err){
  //             if (err){
  //               res.json({success: false, message: err.errmsg});
  //             }
  //             else{
  //               res.json({success: true, message: 'Updated'});
  //             }
  //           });
  //         }
  //         else{
  //           res.json({success: false, message: 'Password is required to update profile'})
  //         }
  //       }
  //     }
  //   });
  // }
  // else{
  //   //wrong type of id
  //   res.json({success: false, message: userId})
  //}

}

function userProfile(req, res, next){
  let {email, password} = req.headers;
  if (email && password){
    User.findOne({email: email}, function(err, user){
      if (err){
        res.status(404);
        res.json({success: false, message: "Error occured"});
      }
      else{
        if (!user){
          res.status(404);
          res.json({success: false, message: "Can't find the user"});
        }else{
          res.status(202);
          res.json({success: true, message: user});
        }
      }
    });
  }else{
    res.status(400);
    res.json({success: false, message: "Email and Password fileds are required"})
  }
}

module.exports = { authenticate, getUsers, createUser, updateUser, userProfile }
