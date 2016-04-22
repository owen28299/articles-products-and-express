'use strict';
/*jshint multistr: true */
const express = require('express'),
      router = express.Router(),
      pass = require('../db/pass.js'),
      crypto = require('crypto'),
      hash = crypto.createHash('sha512'),
      db = require('../psql/connection.js');

router.route('/')
  .get((req, res) => {
    res.render('login');
  })
  .post((req, res) => {
    let encryptedPassword = hash.update(req.body.password).digest('hex');
    db.query('SELECT * FROM users\
              WHERE username = $1\
              AND password = $2\
              ',[req.body.username, encryptedPassword
              ]).then(function(result) {
                if (result.length > 0) {
                  pass.access = true;
                  res.redirect('/');
                } else {
                  res.redirect('/login');
                }
              });
});





module.exports = router;