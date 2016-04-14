'use strict';
const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      articlesRoute = require('./routes/articles'),
      productsRoute = require('./routes/products'),
      analytics = require('./middleware/analytics')
      ;

app.set('view engine', 'jade');
app.set('views', 'public');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(analytics)
  .use(express.static('public'))
  .use('/articles', articlesRoute)
  .use('/products', productsRoute)
  ;

const server = app.listen(3000, () => {
  let host = server.address().address,
      port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});