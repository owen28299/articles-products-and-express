'use strict';
/*jshint multistr: true */

const pgp = require('pg-promise')(),
      password = require('../models/password.js')
      ;

var env = process.env.NODE_ENV || 'development';

var database = 'articles_and_products';

if (env === 'test'){
  database = 'articles_and_products_test';
}

var cn = {
  host: 'localhost',
  port: 5432,
  database: database,
  user: password.user,
  password: password.string
};

var db = pgp(cn);

// if(env === 'test'){
//   db.query('DROP TABLE IF EXISTS products;')
//   .then(function(){
//     return db.query('DROP TABLE IF EXISTS articles;');
//   })
//   .then(function(){
//     return db.query('CREATE TABLE products (\
//     id SERIAL PRIMARY KEY,\
//     name varchar(150) NOT NULL,\
//     price decimal NOT NULL,\
//     inventory integer NOT NULL\
//     );');
//   })
//   .then(function(){
//     return db.query('CREATE TABLE articles (\
//     id SERIAL PRIMARY KEY,\
//     title varchar(150) NOT NULL,\
//     body varchar(255) NOT NULL,\
//     author varchar(150) NOT NULL\
//     );');
//   })
//   .then(function(){
//     db.query('\c articles_and_products_test;');
//   })
//   ;
// }

module.exports = db;