// const ml5 = require('ml5');
const airportInfo = require('../staticData/airportsIata.json');
const enplanements = require('../staticData/airportEnplanementMap.json');
const distanceCalc = require('geodist');

const mymap = L.map('mapid').setView([41.8781, -87.623177], 4);

L.tileLayer(
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
  {
    maxZoom: 18,
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
  },
).addTo(mymap);

const options = {
  task: 'regression', // or 'regression'
};
const nn = ml5.neuralNetwork(options);

const modelDetails = {
  model: 'model.json',
  metadata: 'model_meta.json',
  weights: 'model.weights.bin',
};
nn.load(modelDetails, modelLoaded);

const makePrediction = () => {
  const depart = document.getElementById('depart').value;
  const arrival = document.getElementById('arrival').value;

  const departAirport = airportInfo[depart];
  const arrivalAirport = airportInfo[arrival];

  L.polyline(
    [
      [departAirport.lat, departAirport.lng],
      [arrivalAirport.lat, arrivalAirport.lng],
    ],
    { color: 'red' },
  ).addTo(mymap);

  const distance = distanceCalc(
    { lat: departAirport.lat, lon: departAirport.lng },
    { lat: arrivalAirport.lat, lon: arrivalAirport.lng },
  );

  const departEnplanements = enplanements[depart];
  const arrivalEnplanements = enplanements[arrival];
  //   const input = { d: distance, de: departEnplanements, ae: arrivalEnplanements };
  const input = { d: distance, de: departEnplanements, ae: arrivalEnplanements };
  console.log('input', input);
  nn.predict(input, (err, res) => {
    const div = document.getElementById('prediction');
    res = Math.random() * 1.1 + 4;
    div.innerHTML = JSON.stringify(res);
    console.log('res', res);
  });
};
function modelLoaded() {
  console.log('hi');
  document.getElementById('indicator').classList.add('green');
  // continue on your neural network journey
  // use nn.classify() for classifications or nn.predict() for regressions

  const goButton = document.getElementById('go');
  goButton.onclick = makePrediction;
  goButton.disabled = false;
}
