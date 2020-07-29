const fastcsv = require('fast-csv');
const fs = require('fs');
const ws = fs.createWriteStream("out.csv");
fastcsv
  .write(data, { headers: true })
  .pipe(ws);