'use strict';
/*jshint multistr: true */
const express    = require('express'),
      router     = express.Router(),
      crypto     = require('crypto'),
      validation = require('../middleware/validation'),
      userModel  = require('../models/userModel');


router.route('/')
  .get ((req, res) => {
    res.render('./signUp');
  })
  .post(validation({ "username": "string", "password": "string"}), (req,res) => {

    function encrypt(password){
      var hash = crypto.createHash('sha512');
      return hash.update(password).digest('hex');
    }

    let newUser = ({
      'username': req.body.username,
      'password': encrypt(req.body.password)
    });

    userModel.addUser(newUser)
      .then(function(){
        res.redirect('/login');
      })
      .catch(function(err){
        res.json({
          success: false,
          reason: err
        });
      });
});


module.exports = router;