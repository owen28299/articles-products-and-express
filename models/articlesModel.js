'use strict';
/*jshint multistr: true */

const db = require('../psql/connection.js');

function articleModelFunctions(){

  function getAll(){
    return new Promise(function(resolve,reject){
      db.query('SELECT * FROM articles')
      .then(resolve)
      .catch(function(error){
        reject(error);
      });
    });
  }


  function resetArticles(){
    return new Promise(function(resolve, reject){
      db.query('TRUNCATE TABLE articles')
      .then(resolve)
      .catch(function(error){
        reject(error);
      });
    });
  }


  function addArticle(newArticle){
    return new Promise(function(resolve, reject){
      db.query('INSERT INTO articles (\
                title, body, author)\
                VALUES ($1, $2, $3);',
                [
                newArticle.title,
                newArticle.body,
                newArticle.author
                ])
      .then(resolve)
      .catch(function(error){
        reject(error);
      });

    });
  }

  function getTitle(id){
    return new Promise (function(resolve, reject){
      db.query('SELECT * FROM articles\
                WHERE id = $1', id)
      .then(resolve)
      .catch(function(error){
        reject(error);
      });
    });

  }

  function changeArticle(id, changes){
    return new Promise (function(resolve, reject){
      db.query('UPDATE articles\
                SET title = $1, body = $2, author = $3\
                WHERE id = $4',
                [
                changes.title,
                changes.body,
                changes.author,
                id
                ])
      .then(resolve)
      .catch(function(error){
        reject(error);
      });
    });
  }

  function deleteArticle(id){
    return new Promise (function(resolve, reject){
      db.query('DELETE FROM articles\
                WHERE id = $1',
                id)
      .then(resolve)
      .catch(function(error){
        reject(error);
      });
    });

  }

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