'use strict';
const express        = require('express'),
      router         = express.Router(),
      database       = require('../db/database.json'),
      validation     = require('../middleware/validation'),
      fs             = require('fs'),
      productsModel  = require('../models/productsModel')
      ;


router.route('/login')
  .get((req, res) => {
    res.render('login')
  })

router.route('/')
  .get((req, res) => {
    res.render('index', {
      products: productsModel.getAll()
    });
  })

  .post(validation({ "name": "string", "price": "number", "inventory": "number"}),
    (req, res) => {
      let newProduct = ({
        'name': req.body.name,
        'price': req.body.price,
        'inventory': req.body.inventory
      });

      productsModel.addItem(newProduct, (err) => {
        if(err){
          return res.json({"error" : "bad inputs"});
        }
        res.redirect('/products');
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
      res.redirect('/products');
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
      res.redirect('/products');
    });
  });

router.route('/deleteAll')
  .get( (req,res) => {
    productsModel.resetProducts((err) => {
      if (err){
        res.send('failed');
      }
      else{
        res.redirect('/products');
      }
    });
  });

module.exports = router;