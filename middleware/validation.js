'use strict';
const fs = require('fs');

let analytics = (requirements) => {
  return (req,res,next) => {
    console.log(requirements);
    next();
  };

};

module.exports = analytics;