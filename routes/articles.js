'use strict';
const express = require('express'),
      router = express.Router(),
      validation = require('../middleware/validation'),
      articlesModel = require('../models/articlesModel')
      ;

router.route('/')
  .get ((req, res) => {
    articlesModel.getAll(function(articles){
      res.render('./articles/index', {
        articles: articles
      });
    });

  })
  .post(validation({ "title": "string", "body": "string", "author": "string"}), (req,res) => {
    let newArticle = ({
      'title': req.body.title,
      'body': req.body.body,
      'author': req.body.author
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

router.route('/:id/edit')
  .get( (req,res) => {
    let id = req.params.id;

    articlesModel.getTitle(id, function(article){
      res.render('./articles/edit', {
        article: article[0]
      });
    });

  });

router.route('/new')
  .get( (req,res) => {
    res.render('./articles/new');
  });

router.route('/:id')
  .put(validation({ "title": "string", "body": "string", "author": "string"}, true), (req, res) => {
    let id = req.params.id;
    var changes = req.body;

    articlesModel.changeArticle(id, changes, (err) => {
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
    let id = req.params.id;

    articlesModel.deleteArticle(id, (err) => {
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
        res.redirect('/articles');
      }
    });
  });

module.exports = router;