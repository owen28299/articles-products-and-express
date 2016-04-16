'use strict';

const request       = require('supertest'),
      app           = require('../server.js'),
      database      = require('../db/database.json'),
      chai          = require('chai'),
      expect        = chai.expect
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

  let entry = {
    "title" : "HarryPotter",
    "body" : "7 long books",
    "author" : "JK Rowling"
  };

  database.articles[entry.title] = entry;

  describe('GET /articles', () => {
    it('should return a list of articles', (done) => {
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

  describe('POST /articles', () => {
    it('should create a new article', (done) => {

      let body = {
        "title" : "Eloquent Javascript",
        "body" : "Some Javascript",
        "author" : "A smart person"
      };

      request(app)
        .post('/articles')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(body)
        .expect(302)
        .end((err,res) => {
          if(err) {
            return done(err);
          }
          expect(database.articles[body.title].author).to.have.equal("A smart person");
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

  describe('GET /articles/:title/edit', () => {
    it('should render an HTML page that enables changing products', (done) => {
      request(app)
        .get('/articles/HarryPotter/edit')
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

  describe('PUT /articles/HarryPotter', () => {
    it('should edit an existing article', (done) => {

      let body = {
        "title" : "HarryPotter",
        "body" : "And the Chamber of Secrets",
        "author" : "Ron Weasley"
      };

      request(app)
        .put('/articles/HarryPotter')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(body)
        .expect(302)
        .end((err,res) => {
          if(err) {
            return done(err);
          }
          expect(database.articles.HarryPotter.body).to.equal("And the Chamber of Secrets");
          expect(database.articles.HarryPotter.author).to.equal("Ron Weasley");
          done();
        });
    });

    it('should fail on bad inputs', (done) => {

      let body = {
        "title" : "HarryPotter",
        "newBody" : "And the Goblet of Fire",
        "author" : 1234
      };

      request(app)
        .put('/articles/HarryPotter')
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

  describe('DELETE /articles/HarryPotter', () => {
    it('should delete an existing product', (done) => {

      request(app)
        .delete('/articles/HarryPotter')
        .expect(302)
        .end((err,res) => {
          if(err) {
            return done(err);
          }
          expect(database.articles.hasOwnProperty('HarryPotter')).to.equal(false);
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
          expect(Object.getOwnPropertyNames(database.articles).length).to.equal(0);
          done();
        });
    });
  });

});