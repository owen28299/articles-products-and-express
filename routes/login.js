'use strict';
const express = require('express'),
      router = express.Router(),
      pass = require('../db/pass.js'),
      crypto = require('crypto'),
      hash = crypto.createHash('sha512')
      ;

router.route('/')
  .get((req, res) => {
    res.render('login');
  })
  .post((req, res) => {
    if (req.body.username === 'Hello' && req.body.password === 'World') {
      pass.access = true;
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  });

module.exports = router;