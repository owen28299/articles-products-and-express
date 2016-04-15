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

  return {
    addItem : addItem
  };

}

module.exports = productModelFunctions();