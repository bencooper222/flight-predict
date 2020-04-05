const fs = require('fs');
const CUTOFF = 5;
const airportsArray = JSON.parse(fs.readFileSync('./staticData/airportsArray.json'));
console.log('airportsArray', airportsArray);
const airportFlightsDeparting = JSON.parse(fs.readFileSync('./staticData/flightsByAirport.json'));

const eligibleAirports = airportsArray.filter(el => {
  if (el.country !== 'United States') return false;
  if (airportFlightsDeparting[el.iata] > CUTOFF) return true;
  return false;
});

fs.writeFileSync(`./staticData/moreThan${CUTOFF}Departing.json`, JSON.stringify(eligibleAirports));
