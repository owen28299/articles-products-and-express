'use strict';
const fs = require('fs');

let validation = (requirements, allowEmpty) => {
  return (req,res,next) => {

    let validObj = requirements;
    let inputObj = req.body;

    let valid = true;

    if(Object.keys(validObj).length !== Object.keys(inputObj).length){
      valid = false;
    }

    for (let prop in inputObj){
      let inputType = 'string';
      if(Object.keys(validObj).indexOf(prop) === -1){
        valid = false;
        break;
      }
      if(inputObj[prop].length === 0 && !allowEmpty){
        valid = false;
        break;
      }
      if( !isNaN(Number(inputObj[prop])) ){
        inputType = 'number';
      }

      if(validObj[prop] !== inputType){
        valid = false;
        break;
      }

    }

    if(valid){
      next();
    }
    else {
      res.json({
        "success" : false,
        "reason"  : "invalid inputs"
      });
    }

  };

};

module.exports = validation;