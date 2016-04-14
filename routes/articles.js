'use strict';
const express = require('express'),
      router = express.Router(),
      articleDB = require('../db/articles');

router.route('/')
  .get ((req, res) => {
    res.render();
  })
  .post( (req,res) => {
    let newArticle = ({
      'title': req.body.title,
      'body': req.body.body,
      'author': req.body.author,
      'urlTitle': encodeURI(req.body.title)
    });
    if(!articleDB.hasOwnProperty(req.body.title)){
      articleDB[req.body.title] = newArticle;
      res.json({ success: true });
    }
    else {
      res.json({ success: false });
    }
  });

router.route('/:title')
  .put((req, res) => {
    let title = req.params.title;
    var changes = req.body;

    for (var prop in changes){
      if(articleDB[title].hasOwnProperty(prop) && prop !== 'title'){
        articleDB[title][prop] = changes[prop];
      }
    }
    res.send(articleDB);
  })
  .delete((req,res) => {
    let title = req.params.title;

    if(articleDB.hasOwnProperty(title)){
      delete articleDB[title];
      res.send({success: true});
    }

    else {
      res.send({success: false});
    }

  });

module.exports = router;