'use strict';
/*jshint multistr: true */
const express = require('express'),
      router = express.Router(),
      pass = require('../pass/pass.js'),
      crypto = require('crypto'),
      userModel = require('../models/userModel')
      ;

router.route('/')
  .get((req, res) => {
    res.render('login');
  })
  .post((req, res) => {

    function encrypt(password){
      var hash = crypto.createHash('sha512');
      return hash.update(password).digest('hex');
    }

    let username = req.body.username;
    let password = encrypt(req.body.password);

    userModel.getUser(username, password)
      .then(function(user){
        if(user.length > 0){
          pass.access = true;
          res.redirect('/');
        }
      })
      .catch(function(error){
        res.send(error);
      });

  });


module.exports = router;