'use strict';
const express = require('express'),
      router = express.Router(),
      articleDB = require('../db/articles');

router.route('/')
  .get ((req, res) => {
    res.render('./articles/index', {
      articles: articleDB,
    });
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
      res.redirect('/products/new');

    }
    else {
      res.json({ success: false });
    }
  });

router.route('/:title/edit')
  .get( (req,res) => {
    let title = req.params.title;
    res.render('./articles/edit', {
      article: articleDB[title],
    });
  });

router.route('/new')
  .get( (req,res) => {
    res.render('./articles/new');
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