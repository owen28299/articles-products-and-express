'use strict';
/*jshint multistr: true */

const db = require('../psql/connection.js');

function UserModelFunctions(){

  function getUser(callback){
    db.query('SELECT * FROM users \
              WHERE username\
              AND password')
    .then(function(articles){
      callback(articles);
    })
    .catch(function(error){
      callback(error);
    });
  }

  function addUser(newUser, callback){

    db.query('INSERT INTO Users (\
              username, password)\
              VALUES ($1, $2);',
              [
              newUser.username,
              newUser.password
              ])
    .then(function(){
      callback(null);
    })
    .catch(function(error){
      callback(error);
    });

  }
  return {
    getUser: getUser,
    addUser: addUser
  };
}

module.exports = UserModelFunctions();