'use strict';

const request       = require('supertest'),
      app           = require('../server.js'),
      chai          = require('chai'),
      expect        = chai.expect,
      db = require('../psql/connection.js')
      ;

describe('article routes', () => {

  it('should allow Hello World to pass', (done) => {
    request(app)
    .post('/login')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({
      "username" : "Hello",
      "password" : "World"
    })
    .end((err,res) => {
      if(err) {
        return done(err);
      }
      done();
    });
  });

  let title = "Apple" + Math.floor(Math.random() * 1000);
  let id = 0;

  let entry = {
    "title" : title,
    "body" : "Are nice",
    "author" : "Fuji"
  };


  describe('POST /articles', () => {
    it('should create a new article', (done) => {

      request(app)
        .post('/articles')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(entry)
        .expect(302)
        .end(() => {

          db.query('SELECT id FROM articles\
                    WHERE title = $1', title)
          .then(function(article){
            id = article[0].id;
          });

          done();
        });

    });

    it('should fail on bad inputs', (done) => {

      let body = {
        "title" : "Eloquent Javascript",
        "body" : 12,
        "AUTHORZZ" : "A smart person"
      };

      request(app)
        .post('/articles')
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

  describe('GET /articles', () => {
    it('should render a list of articles to index html', (done) => {
      request(app)
        .get('/articles')
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

  describe('GET /articles/:id/edit', () => {
    it('should render an HTML page that enables changing products', (done) => {
      request(app)
        .get('/articles/'+id+'/edit')
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

  describe('GET /articles/new', () => {
    it('should render an HTML page that enables changing articles', (done) => {
      request(app)
        .get('/articles/new')
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


  describe('PUT /articles/:id', () => {
    it('should edit an existing article', (done) => {

      let body = {
        "title" : title,
        "body" : "Are good for pies",
        "author" : "Granny Smith"
      };

      request(app)
        .put('/articles/' + id)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(body)
        .expect(302)
        .end((err,res) => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should fail on bad inputs', (done) => {

      let body = {
        "title" : title,
        "newBody" : "Bad apple",
        "author" : 1234
      };

      request(app)
        .put('/articles/' + title)
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

  describe('DELETE /articles/:id', () => {
    it('should delete an existing product', (done) => {

      request(app)
        .delete('/articles/' + id)
        .expect(302)
        .end((err,res) => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });

  describe('GET /articles/deleteAll', () => {
    it('should delete ALL articles', (done) => {

      request(app)
        .get('/articles/deleteAll')
        .expect(302)
        .end((err,res) => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });

});