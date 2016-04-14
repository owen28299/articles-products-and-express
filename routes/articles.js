'use strict';
const express = require('express'),
      router = express.Router(),
      articleDB = require('../db/articles');

router.route('/')
  .get ((req, res) => {
    res.send('Hello World!');
    console.log(req.body);
  })
  .post( (req,res) => {
    res.send("posted article");
  });

module.exports = router;