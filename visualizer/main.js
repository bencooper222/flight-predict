const airport = 'ORD';
import ordData from '../data/ORD.json';
import airportData from '../staticData/airportsIata.json';

const mymap = L.map('mapid').setView([51.505, -0.09], 2.5);

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

const ord = airportData.ORD;
const ordPos = [ord.lat, ord.lng];
console.log('ord', ord);
L.marker(ordPos)
  .addTo(mymap)
  .bindPopup('ORD!');

const lines = {};
for (let route of ordData) {
  const arrival = route.arrivalIata;
  if (lines[arrival]) {
    lines[arrival].setStyle({ weight: lines[arrival].options.weight + 0.08 });
    continue;
  }

  const arrivalAirportObject = airportData[arrival];
  try {
    const arrivalAirportPos = [arrivalAirportObject.lat, arrivalAirportObject.lng];

    const line = L.polyline([ordPos, arrivalAirportPos], { color: 'purple', weight: 0.25 }).addTo(
      mymap,
    );
    lines[arrival] = line;
  } catch (err) {
    continue;
  }
}
