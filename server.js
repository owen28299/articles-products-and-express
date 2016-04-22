'use strict';
const express        = require('express'),
      app            = express(),
      bodyParser     = require('body-parser'),
      articlesRoute  = require('./routes/articles'),
      productsRoute  = require('./routes/products'),
      loginRoute     = require('./routes/login'),
      methodOverride = require('method-override'),
      authentication = require('./middleware/authentication'),
      analytics = require('./middleware/analytics'),
      pass = require('./db/pass.js')
      ;

app.use(methodOverride('_method'));

app.set('view engine', 'jade');
app.set('views', 'views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(analytics)
  .use(express.static('public'))
  .use('/login', loginRoute)
  .use('/articles', authentication(pass), articlesRoute)
  .use('/products', authentication(pass), productsRoute)
  ;

if(!module.parent) {
  const server = app.listen(3000, () => {
    let host = server.address().address,
        port = server.address().port;
    console.log('listening at http://%s:%s', host, port);
  });
}

module.exports = app;