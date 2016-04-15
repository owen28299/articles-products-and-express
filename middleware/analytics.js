'use strict';
const fs = require('fs');

let analytics = (req,res,next) => {
  let method = JSON.stringify([req.method]);
  let url = JSON.stringify([req.originalUrl]);
  let date = JSON.stringify([new Date()]);
  let headers = JSON.stringify([req.headers]);

  let path = './logs/analytics.log';

  fs.readFile(path, (err,data) => {
    let oldFile = data;
    let newLog = [];
    newLog.push(method,url,date,headers);
    newLog = newLog.join(" ");
    oldFile += newLog + "\n\n";

    fs.writeFile(path,oldFile);

  });

  next();
};

module.exports = analytics;