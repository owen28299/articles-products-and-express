'use strict';
const express        = require('express'),
      app            = express(),
      bodyParser     = require('body-parser'),
      articlesRoute  = require('./routes/articles'),
      productsRoute  = require('./routes/products'),
      analytics      = require('./middleware/analytics'),
      methodOverride = require('method-override');

      app.use(methodOverride('_method'));

      app.set('view engine', 'jade');
      app.set('views', 'views');

      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({
        extended: true
      }));

      app.use(analytics)
        .use(express.static('public'))
        .use('/articles', articlesRoute)
        .use('/products', productsRoute)
        ;


      app.get('/login', (req, res) => {
          res.render('login')
        });

      app.post('/login', (req, res) => {
          if (req.body.username === 'Hello' && req.body.password === 'World') {
            console.log('Authentication Verified')
          } else {
            console.log('please try again')
          }
        });

const server = app.listen(3000, () => {
  let host = server.address().address,
      port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});