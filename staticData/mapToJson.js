const fs = require('fs');

const file = fs.readFileSync('./staticData/airports.dat', 'utf8');
const brokenUp = file.split('\n').map(el => el.split(',').map(el => el.replace(/^"(.*)"$/, '$1')));

const jsonArray = brokenUp.map(
  ([id, name, city, country, iata, icao, lat, lng, alt, tzOffset, dst, tz, type, source]) => ({
    id,
    name,
    city,
    country,
    iata,
    icao,
    lat,
    lng,
    alt,
    tzOffset,
    dst,
    tz,
    type,
    source,
  }),
);

fs.writeFileSync('./staticData/airportsArray.json', JSON.stringify(jsonArray));
console.info('Wrote airport array');

const jsonObjIata = jsonArray.reduce((acc, el) => {
  acc[el.iata] = el;
  return acc;
}, {});

fs.writeFileSync('./staticData/airportsIata.json', JSON.stringify(jsonObjIata));

const jsonObjIcao = jsonArray.reduce((acc, el) => {
  acc[el.icao] = el;
  return acc;
}, {});

fs.writeFileSync('./staticData/airportsIcao.json', JSON.stringify(jsonObjIcao));
