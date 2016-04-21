'use strict';
/*jshint multistr: true */

const pgp = require('pg-promise')(),
      password = require('./password.js')
      ;

var cn = {
  host: 'localhost',
  port: 5432,
  database: 'articles_and_products',
  user: password.user,
  password: password.password
};

var db = pgp(cn);

function articleModelFunctions(){

  function getAll(callback){
    db.query('SELECT * FROM articles')
    .then(function(articles){
      callback(articles);
    })
    .catch(function(error){
      callback(error);
    });
  }

  function resetArticles(callback){
    db.query('TRUNCATE TABLE articles')
    .then(function(){
      callback(null);
    })
    .catch(function(error){
      callback(error);
    });
  }

  function addArticle(newArticle, callback){

    db.query('INSERT INTO articles (\
              title, body, author)\
              VALUES ($1, $2, $3);',
              [
              newArticle.title,
              newArticle.body,
              newArticle.author
              ])
    .then(function(){
      callback(null);
    })
    .catch(function(error){
      callback(error);
    });

  }

  function getTitle(id, callback){
    db.query('SELECT * FROM articles\
              WHERE id = $1', id)
    .then(function(article){
      callback(article);
    })
    .catch(function(error){
      callback(error);
    });
  }

  function changeArticle(id, changes, callback){
    db.query('UPDATE articles\
              SET title = $1, body = $2, author = $3\
              WHERE id = $4',
              [
              changes.title,
              changes.body,
              changes.author,
              id
              ])
    .then(function(){
      callback(null);
    })
    .catch(function(error){
      callback(error);
    });
  }

  function deleteArticle(id, callback){
    db.query('DELETE FROM articles\
              WHERE id = $1',
              id)
    .then(function(){
      callback(null);
    })
    .catch(function(error){
      callback(error);
    });  }

  return {
    resetArticles : resetArticles,
    getAll : getAll,
    addArticle : addArticle,
    getTitle : getTitle,
    changeArticle : changeArticle,
    deleteArticle : deleteArticle
  };
}

module.exports = articleModelFunctions();