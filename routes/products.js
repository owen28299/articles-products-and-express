'use strict';
const express        = require('express'),
      router         = express.Router(),
      database = require('../db/database.json'),
      validation     = require('../middleware/validation'),
      fs = require('fs')
      ;

router.route('/')
  .get((req, res) => {
    res.render('index', {
      products: database.products.products
    });
  })
  .post(validation({ "name": "string", "price": "number", "inventory": "number"}),
    (req, res) => {
    let newProduct = ({
      'name': req.body.name,
      'price': req.body.price,
      'inventory': req.body.inventory
    });

    Object.defineProperty(newProduct,'id',{
      value: database.products.products.length,
      enumerable: true,
      writable: false,
      configurable: false
    });

    database.products.products.push(newProduct);
    fs.writeFile('./db/database.json', JSON.stringify(database), () => {
      res.redirect('/');
    });
  });

router.route('/:id/edit')
  .get( (req,res) => {
    let id = req.params.id;
    res.render('edit', {
      product : database.products.products[id]
    });
  });

router.route('/new')
  .get( (req,res) => {
    res.render('new');
  });

router.route('/:id')
  .put(validation({ "name": "string", "price": "number", "inventory": "number" }, true), (req, res) => {
    let id = req.params.id;
    if (database.products.products.length === 0) {
      return res.status(400).send('Bad Request: There are no products');
    }
    else {
      let product = database.products.products[id];
        for (let prop in req.body) {
          try {
            if (product.hasOwnProperty(prop) && req.body[prop]){
              product[prop] = req.body[prop];
            }
          }
          catch(err){
            return res.send('Invalid Request: Field Cannot Be Changed');
          }
        }
    fs.writeFile('./db/database.json', JSON.stringify(database), () => {
      res.redirect('/');
    });
    }
  })
  .delete((req,res) => {
    let id = req.params.id;

    if (database.products.products.length === 0) {
      return res.status(400).send('Bad Request: There are no products');
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
    fs.writeFile('./db/database.json', JSON.stringify(database), () => {
      res.redirect('/');
    });

  });

module.exports = router;