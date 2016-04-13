'use strict';
const express = require('express'),
      router = express.Router();

router.route('/')
  .get ((req, res) => {
    res.send('Hello World!');
    console.log(req.body);
  });

module.exports = router;