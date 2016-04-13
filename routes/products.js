'use strict';
const express = require('express'),
      router = express.Router(),
      productDB = require('../db/products');

router.route('/')
  .get ((req, res, next) => {
    res.send(productDB);
    console.log(req.body);
    next();
  })
  .post((req, res, next) => {
  let newProduct = ({
    'name': req.body.name,
    'price': req.body.price,
    // 'id': productDB.products.length,
    'inventory': req.body.inventory
  });
  Object.defineProperty(newProduct,'id',{
    value: productDB.products.length,
    enumerable: true,
    writable: false,
    configurable: false
  });
  productDB.products.push(newProduct);
  res.json({ success: true });
  })

 router.route('/:id')
  .put((req, res) => {
 let id = req.param('id');
    if (productDB.products.length === 0) {
      return res.status(400).send('Bad Request: There are no products');
    } else {
      let product = productDB.products[id];
        for (let prop in req.body) {
          try {
            if (product.hasOwnProperty(prop)){
              product[prop] = req.body[prop];
            }
          }
          catch(err){
            return res.send('Invalid Request: Field Cannot Be Changed');
          }
        }
        res.send(productDB);
    }
  })

.delete((req,res) => {

});




module.exports = router;