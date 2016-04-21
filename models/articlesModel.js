'use strict';

const fs       = require('fs'),
      database = require('../db/database.json');

function articleModelFunctions(){

  function getAll(){
    return database.articles;
  }

  function resetArticles(callback){
    database.articles = {};
    fs.writeFile('./db/database.json', JSON.stringify(database), (err) => {
      if(err){
        callback(err);
      } else {
          callback(null);
        }
    });
  }

  function addArticle(newArticle, callback){

    if(!database.articles.hasOwnProperty(newArticle.title)){
      database.articles[newArticle.title] = newArticle;
      fs.writeFile('./db/database.json', JSON.stringify(database), (err) => {
          if(err){
            callback(err);
          }
          else{
            callback(null);
          }
      });
    }
    else {
      callback("Article with same name exists");
    }
  }

  function getTitle(title){
    return database.articles[title];
  }

  function changeArticle(title, changes, callback){
    for (var prop in changes){
      if(database.articles[title].hasOwnProperty(prop) && prop !== 'title'){
        database.articles[title][prop] = changes[prop];
      }
    }
    fs.writeFile('./db/database.json', JSON.stringify(database), (err) => {
      if(err){
        callback(err);
      }
      else{
        callback(null);
      }
    });
  }

  function deleteArticle(title, callback){
    if(database.articles.hasOwnProperty(title)){
      delete database.articles[title];
      fs.writeFile('./db/database.json', JSON.stringify(database), (err) => {
        if(err){
          callback(err);
        }
        else {
          callback(null);
        }
      });
    }
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