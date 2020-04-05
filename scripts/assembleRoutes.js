const fs = require('fs');
const distanceCalc = require('geodist');
const usAirports = JSON.parse(fs.readFileSync('./staticData/withEnplanements.json'));
const files = fs.readdirSync('./data/');

const usAirportMap = usAirports.reduce((acc, el) => {
  acc[el.iata] = el;
  return acc;
}, {});

const allRoutes = [];
for (const file of files) {
  if (usAirportMap[file.slice(0, 3)] != null) {
    const theseRoutes = JSON.parse(fs.readFileSync('./data/' + file));
    const usOnlyRoutes = theseRoutes.filter(el => {
      if (usAirportMap[el.arrivalIata]) return true;
      return false;
    });
    allRoutes.push(...usOnlyRoutes);
  }
}

for (let i = 0; i < allRoutes.length; i++) {
  const arrivalObj = usAirportMap[allRoutes[i].arrivalIata];
  const departureObj = usAirportMap[allRoutes[i].departureIata];

  // add distance
  allRoutes[i].distance = distanceCalc(
    { lat: arrivalObj.lat, lon: arrivalObj.lng },
    { lat: departureObj.lat, lon: departureObj.lng },
  );

  // add source movement
  allRoutes[i].depatureEnplanements = departureObj.enplanements;

  // add destination movements
  allRoutes[i].arrivalEnplanements = arrivalObj.enplanements;

  // delete dumb stuff
  delete allRoutes[i].airlineIata;
  delete allRoutes[i].codeshares;
  delete allRoutes[i].flightNumber;
  delete allRoutes[i].departureTime;
  delete allRoutes[i].arrivalTime;
}

// now aggregate

const reducedRoutes = allRoutes.reduce((acc, el) => {
  const hash = el.arrivalIata + el.departureIata;
  if (acc[hash] != undefined) acc[hash].counter++;
  else acc[hash] = { ...el, counter: 1 };

  return acc;
}, {});
// console.log(Object.values(reducedRoutes).slice(0, 10));
fs.writeFileSync('staticData/usFinalJson.json', JSON.stringify(Object.values(reducedRoutes)));
