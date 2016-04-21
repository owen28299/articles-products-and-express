'use strict';

let authentication = (pass) => {
  return (req, res, next)=>{
    if (!pass.access && module.parent) {
      return res.redirect('/login');
    } else {
      next();
    }
  };
};

module.exports = authentication;