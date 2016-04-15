'use strict';
const express        = require('express'),
      router         = express.Router(),
      productDB      = require('../db/products'),
      methodOverride = require('method-override'),
      validation     = require('../middleware/validation')
      ;

router.use(methodOverride('_method'));

router.route('/')
  .get((req, res) => {
    res.render('index', {
      products: productDB.products
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
      value: productDB.products.length,
      enumerable: true,
      writable: false,
      configurable: false
    });

    productDB.products.push(newProduct);
    res.redirect('/products/new');
  });

router.route('/:id/edit')
  .get( (req,res) => {
    let id = req.params.id;
    res.render('edit', {
      product : productDB.products[id]
    });
  });

router.route('/new')
  .get( (req,res) => {
    res.render('new');
  });

router.route('/:id')
  .put(validation({ "name": "string", "price": "number", "inventory": "number" }, true), (req, res) => {
    let id = req.params.id;
    if (productDB.products.length === 0) {
      return res.status(400).send('Bad Request: There are no products');
    }
    else {
      let product = productDB.products[id];
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
        res.redirect('/products');
    }
  })
  .delete((req,res) => {
    let id = req.params.id;

    if (productDB.products.length === 0) {
      return res.status(400).send('Bad Request: There are no products');
    }
    else{
      let product = productDB.products[id];
      for (var prop in product){
        let d = Object.getOwnPropertyDescriptor(product, prop);
        if(d.writable === true){
          product[prop] = null;
        }
      }
    }
    res.redirect('/products');

  });

module.exports = router;