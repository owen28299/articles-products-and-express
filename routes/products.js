'use strict';
const express        = require('express'),
      router         = express.Router(),
      validation     = require('../middleware/validation'),
      productsModel  = require('../models/productsModel')
      ;

router.route('/')
  .get((req, res) => {
    productsModel.getAll(function(products){
      res.render('index', {
        products: products
      });
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
    productsModel.getProduct(id, function(error, product){
      if(error){
        res.send("Failed to retrieve data");
      }
      else {
        res.render('edit', {
          product : product[0]
        });
      }
    });
  });

router.route('/new')
  .get( (req,res) => {
    res.render('new');
  });

router.route('/:id')
  .put(validation({ "name": "string", "price": "number", "inventory": "number" }, true), (req, res) => {

    let id = req.params.id;
    let changes = req.body;

    productsModel.changeProduct(id, changes, (err) => {
      if(err){
        return res.json({
          "success" : "false",
          "reason"  : err
        });
      }
      res.redirect('/products');
    });
  })
  .delete((req,res) => {
    let id = req.params.id;

    productsModel.deleteProduct(id, (err) => {
      if(err){
        res.json({
          "success" : false,
          "reason"  : err
        });
      }
      else {
        res.redirect('/products');
      }
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