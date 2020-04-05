require('dotenv').config();
const { AVIATION_EDGE_API_KEY } = process.env;
const getAirportRouteData = require('./getAirportRouteData');
const { writeFileSync, existsSync } = require('fs');

// seeds should be in a unique map
// this is so badly optimized, I can't even but whatever
const dfsGetRouteData = async (seeds, airportMap = {}, depth = 4) => {
  for (let seed of seeds) {
    if (airportMap[seed] != null) continue;
    const path = `./data/${seed}.json`;
    if (existsSync(path)) {
      console.log(`Airport data for : ${seed} already exists`);
      continue;
    }

    const airportData = await getAirportRouteData(seed, AVIATION_EDGE_API_KEY);
    writeFileSync(path, JSON.stringify(airportData));
    airportMap[seed] = true;
    console.log(`Wrote airport data for: ${seed}`);

    if (depth > 0) {
      // do all airports off this seed in one function call to reduce overhead
      const newSeeds = [];
      for (let { arrivalIata } of airportData) {
        if (airportMap[arrivalIata] == null && seed !== '') newSeeds.push(arrivalIata);
      }
      dfsGetRouteData(newSeeds, airportMap, depth - 1);
    }
  }
};

module.exports = dfsGetRouteData;
