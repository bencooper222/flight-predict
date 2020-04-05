const fs = require('fs');
const moreThan5 = JSON.parse(fs.readFileSync('./staticData/moreThan5Departing.json'));
const usEnplanements = JSON.parse(fs.readFileSync('./staticData/usAirportEnplanments.json'));

const enplanementMap = usEnplanements.reduce((acc, el) => {
  acc[el.iata] = el.enplanements;
  return acc;
}, {});
console.log('enplanementMap', enplanementMap);
const rtn = [];
for (let i = 0; i < moreThan5.length; i++) {
  const enplanements = Number(enplanementMap[moreThan5[i].iata]);

  if (isNaN(enplanements) || enplanements === 0) continue;

  rtn.push({ ...moreThan5[i], enplanements });
}

console.log(rtn);

fs.writeFileSync('./staticData/withEnplanements.json', JSON.stringify(rtn));
