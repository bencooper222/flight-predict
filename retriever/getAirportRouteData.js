const fetch = require('node-fetch');
const getAirportRouteData = async (iataCode, apiKey) => {
  const url = `https://aviation-edge.com/v2/public/routes?key=${apiKey}&departureIata=${iataCode}&limit=3000`;
  let data;
  try {
    data = await (await fetch(url)).json();
  } catch (err) {
    console.error(err);
    return;
  }

  return data.map(
    ({
      airlineIata,
      arrivalIata,
      departureIata,
      codeshares,
      flightNumber,
      arrivalTime,
      departureTime,
    }) => ({
      airlineIata,
      arrivalIata,
      departureIata,
      codeshares,
      flightNumber,
      arrivalTime,
      departureTime,
    }),
  );
};

module.exports = getAirportRouteData;
