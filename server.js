'use strict';
const express        = require('express'),
      app            = express(),
      bodyParser     = require('body-parser'),
      articlesRoute  = require('./routes/articles'),
      productsRoute  = require('./routes/products'),
      analytics      = require('./middleware/analytics'),
      cookieParser   = require('cookie-parser'),
      methodOverride = require('method-override');

let pass = false;

let authentication = () => {
  return (req, res, next)=>{
    if (!pass && module.parent) {
      return res.redirect('/login');
    } else {
      next();
    }
  };
};

app.use(methodOverride('_method'));
app.use(cookieParser());

app.set('view engine', 'jade');
app.set('views', 'views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(analytics)
  .use(express.static('public'))
  .use('/articles', authentication(), articlesRoute)
  .use('/products', authentication(), productsRoute)
  ;

app.get('/login', (req, res) => {
    res.render('login');
  });

app.post('/login', (req, res) => {
    if (req.body.username === 'Hello' && req.body.password === 'World') {
      req.cookies.user = req.body.username;
      req.cookies.password = req.body.password;
      pass = true;
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  });

if(!module.parent) {
  const server = app.listen(3000, () => {
    let host = server.address().address,
        port = server.address().port;
    console.log('listening at http://%s:%s', host, port);
  });
}

module.exports = app;