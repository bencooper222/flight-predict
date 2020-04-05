const fs = require('fs');
const files = fs.readdirSync('./data/');

const rtn = {};

for (const file of files) {
  rtn[file.slice(0, 3)] = JSON.parse(fs.readFileSync('./data/' + file)).length;
}

fs.writeFileSync('./staticData/flightsByAirport.json', JSON.stringify(rtn));
