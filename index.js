#!/usr/bin/env node
const argv = require('yargs').argv;
const bfsGetRouteData = require('./retriever/index');

(async () => {
  const airports = argv.airports.split(',').map(el => el.toUpperCase());
  await bfsGetRouteData(airports);
})();
