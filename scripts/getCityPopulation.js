const fs = require('fs');
const fetch = require('node-fetch');
const moreThan50 = JSON.parse(fs.readFileSync('./staticData/moreThan50Departing.json'));

const URL =
  'https://public.opendatasoft.com/api/records/1.0/search/?dataset=worldcitiespop&sort=population&q=';
let count = 0;
(async () => {
  const tasks = moreThan50.map(async airport => {
    const data = await (await fetch(`${URL}${airport.city}`)).json();
    const rtn = data.records[0].fields.population;
    if (rtn == undefined) console.error(`Not found: ${airport.city} ${++count}`);
  });

  await Promise.all(tasks);

  console.log(count / moreThan20.length);
})();
