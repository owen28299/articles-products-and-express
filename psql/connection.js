'use strict';

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
  user: 'owen',
  password: password.string
};

var db = pgp(cn);

module.exports = db;