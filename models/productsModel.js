'use strict';

const fs       = require('fs'),
      database = require('../db/database.json');

function productModelFunctions(){

  function addItem (newProduct, callback){

    Object.defineProperty(newProduct,'id',{
      value: database.products.products.length,
      enumerable: true,
      writable: false,
      configurable: false
    });

    database.products.products.push(newProduct);
    fs.writeFile('./db/database.json', JSON.stringify(database), (err) => {
      if(err){
        callback(err);
      }
      else{
        callback(null);
      }
    });

  }

  let getAll = () => {
     return database.products.products;
  };

  function resetProducts(callback){
    database.products.products = [];
    fs.writeFile('./db/database.json', JSON.stringify(database), (err) => {
      if(err){
        callback(err);
      } else {
          callback(null);
        }
    });
  }

  function getProduct(id){
    return database.products.products[id];
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