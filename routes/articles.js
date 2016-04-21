'use strict';
const express = require('express'),
      router = express.Router(),
      validation = require('../middleware/validation'),
      articlesModel = require('../models/articlesModel')
      ;

router.route('/')
  .get ((req, res) => {
    res.render('./articles/index', {
      articles: articlesModel.getAll()
    });
  })
  .post(validation({ "title": "string", "body": "string", "author": "string"}), (req,res) => {
    let newArticle = ({
      'title': req.body.title,
      'body': req.body.body,
      'author': req.body.author,
      'urlTitle': encodeURI(req.body.title)
    });

    articlesModel.addArticle(newArticle, (err) => {
      if(err){
        res.json({
          success: false,
          reason: err
        });
      }
      else{
        res.redirect('/articles');
      }

    });
  });

router.route('/:title/edit')
  .get( (req,res) => {
    let title = req.params.title;
    res.render('./articles/edit', {
      article: articlesModel.getTitle(title)
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

    articlesModel.changeArticle(title, changes, (err) => {
      if(err){
        return res.json({
          success : false,
          reason : err
        });
      }
      else{
        res.redirect('/articles');
      }
    });
  })
  .delete((req,res) => {
    let title = req.params.title;

    articlesModel.deleteArticle(title, (err) => {
      if(err){
        res.send({
          success : false,
          reason : err
        });
      }
      else{
        res.redirect('/articles');
      }
    });

  });

router.route('/deleteAll')
  .get( (req,res) => {
    articlesModel.resetArticles((err) => {
      if (err){
        res.send('failed');
      }
      else{
        res.redirect('/products');
      }
    });
  });

module.exports = router;