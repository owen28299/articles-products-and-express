'use strict';
const express = require('express'),
      router = express.Router(),
      database = require('../db/database.json'),
      validation = require('../middleware/validation'),
      fs = require('fs')
      ;

router.route('/')
  .get ((req, res) => {
    res.render('./articles/index', {
      articles: database.articles,
    });
  })
  .post(validation({ "title": "string", "body": "string", "author": "string"}), (req,res) => {
    let newArticle = ({
      'title': req.body.title,
      'body': req.body.body,
      'author': req.body.author,
      'urlTitle': encodeURI(req.body.title)
    });
    if(!database.articles.hasOwnProperty(req.body.title)){
      database.articles[req.body.title] = newArticle;
      fs.writeFile('./db/database.json', JSON.stringify(database), () => {
        res.redirect('/articles');
      });
    }
    else {
      res.json({ success: false });
    }


  });

router.route('/:title/edit')
  .get( (req,res) => {
    let title = req.params.title;
    res.render('./articles/edit', {
      article: database.articles[title],
    });
  });

router.route('/new')
  .get( (req,res) => {
    res.render('./articles/new');
  });

router.route('/:title')
  .put(validation({ "title": "string", "body": "string", "author": "string"}, true), (req, res) => {
    let title = req.params.title;
    var changes = req.body;

    for (var prop in changes){
      if(database.articles[title].hasOwnProperty(prop) && prop !== 'title'){
        database.articles[title][prop] = changes[prop];
      }
    }
    fs.writeFile('./db/database.json', JSON.stringify(database), () => {
      res.redirect('/articles');
    });
  })
  .delete((req,res) => {
    let title = req.params.title;

    if(database.articles.hasOwnProperty(title)){
      delete database.articles[title];
      fs.writeFile('./db/database.json', JSON.stringify(database), () => {
        res.redirect('/articles');
      });
    }

    else {
      res.send({success: false});
    }

  });

module.exports = router;