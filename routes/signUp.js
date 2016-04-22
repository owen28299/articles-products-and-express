'use strict';
/*jshint multistr: true */
const express    = require('express'),
      router     = express.Router(),
      pass       = require('../db/pass.js'),
      crypto     = require('crypto'),
      hash       = crypto.createHash('sha512'),
      validation = require('../middleware/validation'),
      userModel  = require('../models/userModel');


router.route('/')
  .get ((req, res) => {
    userModel.getUser(function(users){
      res.render('./signUp');
    });
  })

  .post(validation({ "username": "string", "password": "string"}), (req,res) => {

  let encryptedPassword = hash.update(req.body.password).digest('hex');

    let newUser = ({
      'username': req.body.username,
      'password': encryptedPassword
    });

    userModel.addUser(newUser, (err) => {
      if(err){
        res.json({
          success: false,
          reason: err
        });
      }
      else{
        res.redirect('/login');
      }

    });
});


module.exports = router;