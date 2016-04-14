'use strict';

function analytics(req,res,next) {
  console.log(req.method);
  console.log(req.originalUrl);
  console.log(new Date());
  console.log(req.headers);
  next();
}

module.exports = analytics;