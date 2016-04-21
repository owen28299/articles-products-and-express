'use strict';
/*jshint multistr: true */

const fs       = require('fs'),
      database = require('../db/database.json'),
      pgp = require('pg-promise')(),
      password = require('./password.js')
      ;

var cn = {
  host: 'localhost',
  port: 5432,
  database: 'articles_and_products',
  user: 'owen',
  password: password.string
};

var db = pgp(cn);


function productModelFunctions(){

  function addItem (newProduct, callback){

    let name = (newProduct.name);
    let price = (newProduct.price);
    let inventory = (newProduct.inventory);

    db.query('INSERT INTO products\
      (name, price, inventory)\
      values ($1, $2, $3);',
      [name, price, inventory])
    .then(function(){
      callback(null);
    })
    .catch(function(error){
      callback(error);
    });
  }

  let getAll = (callback) => {
    db.query('SELECT * FROM products')
    .then(function(products){
      callback(products);
    })
    .catch(function(err){
      return (err);
    });
  };

  function resetProducts(callback){
    db.query('TRUNCATE TABLE products')
    .then(function(){
      callback(null);
    })
    .catch(function(error){
      callback(error);
    });
  }

  function getProduct(id, callback){
    db.query('SELECT * FROM products\
     WHERE id = $1', id)
    .then(function(product){
      callback(null, product);
    })
    .catch(function(error){
      callback(error);
    });
  }

  function changeProduct(id,changes,callback){

    if (database.products.products.length === 0) {
      return callback('Bad Request: There are no products');
    }
    else {
      let product = database.products.products[id];
        for (let prop in changes) {
          try {
            if (product.hasOwnProperty(prop) && changes[prop]){
              product[prop] = changes[prop];
            }
          }
          catch(err){
            return callback('Invalid Request: Field Cannot Be Changed');
          }
        }
    fs.writeFile('./db/database.json', JSON.stringify(database), (err) => {

      if(err){
        callback(err);
      } else {
        callback(null);
      }

    });
    }

  }

  function deleteProduct(id, callback){
    if (database.products.products.length === 0) {
      return callback('Bad Request: There are no products');
    }
    else{
      let product = database.products.products[id];
      for (var prop in product){
        let d = Object.getOwnPropertyDescriptor(product, prop);
        if(d.writable === true && prop !== 'id'){
          product[prop] = null;
        }
      }
    }
    fs.writeFile('./db/database.json', JSON.stringify(database), (err) => {
      if(err){
        callback(err);
      }
        callback(null);
    });
  }

  return {
    resetProducts : resetProducts,
    getAll  : getAll,
    addItem : addItem,
    getProduct : getProduct,
    changeProduct : changeProduct,
    deleteProduct : deleteProduct
  };
}

module.exports = productModelFunctions();