'use strict';
/*jshint multistr: true */

const pgp = require('pg-promise')(),
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

    var name = changes.name;
    var price = changes.price;
    var inventory = changes.inventory;

    db.query('UPDATE products\
              SET name = $1, price = $2, inventory = $3\
              WHERE id = $4', [name, price, inventory, id])
    .then(function(){
      callback(null);
    })
    .catch(function(error){
      callback(error);
    });

  }

  function deleteProduct(id, callback){

    db.query('DELETE FROM products\
              WHERE id = $1',
              id)
    .then(function(){
      callback(null);
    })
    .catch(function(error){
      callback(error);
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