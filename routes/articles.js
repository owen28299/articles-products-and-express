'use strict';
const express = require('express'),
      router = express.Router(),
      validation = require('../middleware/validation'),
      articlesModel = require('../models/articlesModel')
      ;

router.route('/')
  .get ((req, res) => {
    articlesModel.getAll()
      .then(function(articles){
        res.render('./articles/index', {
          articles: articles
        });
      })
      .catch(function(error){
        res.send(error);
      });


  })
  .post(validation({ "title": "string", "body": "string", "author": "string"}), (req,res) => {
    let newArticle = ({
      'title': req.body.title,
      'body': req.body.body,
      'author': req.body.author
    });

    articlesModel.addArticle(newArticle)
    .then(function(){
      res.redirect('/articles');
    })
    .catch(function(error){
      res.json({
        success: false,
        reason: error
      });
    });
  });



router.route('/:id/edit')
  .get( (req,res) => {
    let id = req.params.id;

    articlesModel.getTitle(id)
    .then(function(article){
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
    articlesModel.resetArticles()
    .then(function(){
      res.redirect('/articles');
    })
    .catch(function(error){
      res.send(error);
    });

    });

module.exports = router;