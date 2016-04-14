'use strict';
const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      articlesRoute = require('./routes/articles'),
      productsRoute = require('./routes/products');

app.set('view engine', 'jade');
app.set('views', 'public');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));
app.use('/articles', articlesRoute);
app.use('/products', productsRoute);

const server = app.listen(3000, () => {
  let host = server.address().address,
      port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});