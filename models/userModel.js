'use strict';
/*jshint multistr: true */

const db = require('../psql/connection.js');

function UserModelFunctions(){

  function getUser(username, password){
    return new Promise (function(resolve, reject){
      db.query('SELECT * FROM users \
                WHERE username = $1\
                AND password = $2', [username, password])
      .then(resolve)
      .catch(function(error){
        reject(error);
      });
    });

  }

  function addUser(newUser){
    return new Promise (function(resolve,reject){
      db.query('INSERT INTO Users (\
                username, password)\
                VALUES ($1, $2);',
                [
                newUser.username,
                newUser.password
                ])
      .then(resolve)
      .catch(function(error){
        reject(error);
      });
    });

  }

  return {
    getUser: getUser,
    addUser: addUser
  };
}

module.exports = UserModelFunctions();