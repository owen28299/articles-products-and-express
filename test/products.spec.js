'use strict';
/*jshint multistr: true */

const request  = require('supertest'),
      app      = require('../server.js'),
      database = require('../db/database.json'),
      chai     = require('chai'),
      expect   = chai.expect
      ;


describe('product routes', () => {
  it('should allow Hello World to pass', (done) => {
    request(app)
    .post('/login')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({
      "username" : "Hello",
      "password" : "World"
    })
    .expect(302)
    .end((err,res) => {
      if(err) {
        return done(err);
      }
      done();
    });
  });




  var originalLength = database.products.products.length;

  describe('GET /products', () => {
    it('should return a list of products', (done) => {
      request(app)
        .get('/products')
        .expect(200)
        .expect('Content-Type', /html/)
        .end((err,res) => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });

  describe('POST /products', () => {
    it('should create a new product', (done) => {

      let price = Math.floor(Math.random() * 100);
      let inventory = Math.floor(Math.random() * 1000);

      let entry = {
        "name" : "apple",
        "price" : price,
        "inventory" : inventory
      };



      request(app)
        .post('/products')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(entry)
        .expect(302)
        .end(() => {
            done();
        });

        db.query('SELECT * FROM products\
                  WHERE price = $1 AND inventory = $2;',
          [price, inventory])
        .then(function(products){
          expect(products).to.equal('HELLO WORLD');
        });

    });

    it('should fail on bad inputs', (done) => {

      let body = {
        "name" : "pear",
        "price" : "twelve",
        "inventory" : "fifty"
      };

      request(app)
        .post('/products')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(body)
        .expect(200)
        .end((err,res) => {
          if(err) {
            return done(err);
          }
          expect(res.body.success).to.equal(false);
          expect(database.products.products).to.have.length.above(originalLength);
          done();
        });

    });

  });

  describe('GET /products/:id/edit', () => {
    it('should render an HTML page that enables changing products', (done) => {
      request(app)
        .get('/products/0/edit')
        .expect(200)
        .expect('Content-Type', /html/)
        .end((err,res) => {
          if(err){
            return done(err);
          }
          expect(res).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /products/new', () => {
    it('should render an HTML page that enables changing products', (done) => {
      request(app)
        .get('/products/new')
        .expect(200)
        .expect('Content-Type', /html/)
        .end((err,res) => {
          if(err){
            return done(err);
          }
          expect(res).to.be.an('object');
          done();
        });
    });
  });

  describe('PUT /products/' + originalLength, () => {
    it('should edit an existing product', (done) => {

      let body = {
        "name" : "banana",
        "price" : 15,
        "inventory" : 75
      };

      request(app)
        .put('/products/' + originalLength)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(body)
        .expect(302)
        .end((err,res) => {
          if(err) {
            return done(err);
          }
          expect(database.products.products[originalLength].name).to.equal('banana');
          expect(database.products.products[originalLength].price).to.equal('15');
          expect(database.products.products[originalLength].inventory).to.equal('75');
          done();
        });
    });

    it('should fail on bad inputs', (done) => {

      let body = {
        "name" : "banana",
        "price" : "fifteen",
        "inventory" : "seventyfive"
      };

      request(app)
        .put('/products/' + originalLength)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(body)
        .expect(200)
        .end((err,res) => {
          if(err) {
            return done(err);
          }
          expect(res.body.success).to.equal(false);
          done();
        });
    });
  });

  describe('DELETE /products/' + originalLength, () => {
    it('should delete an existing product', (done) => {

      request(app)
        .delete('/products/' + originalLength)
        .expect(302)
        .end((err,res) => {
          if(err) {
            return done(err);
          }
          expect(database.products.products[originalLength].name).to.equal(null);
          expect(database.products.products[originalLength].price).to.equal(null);
          expect(database.products.products[originalLength].inventory).to.equal(null);
          done();
        });
    });
  });

  describe('GET /products/deleteAll', () => {
    it('should delete ALL products', (done) => {

      request(app)
        .get('/products/deleteAll')
        .expect(302)
        .end((err,res) => {
          if(err) {
            return done(err);
          }
          expect(database.products.products.length).to.equal(0);
          done();
        });
    });
  });

});