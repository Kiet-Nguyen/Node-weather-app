const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true,
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

const convertFahrenheitToCelsius = fahrenheit => {
  const celsius = Math.round(((fahrenheit - 32) * 5) / 9);
  return celsius;
}

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=uDry3iTzgERHtuHWl4ZOK6yCxaXHmNGE&location=${encodedAddress}`;

axios.get(geocodeUrl)
  .then(response => {
    if (response.data.statuscode === 400) {
      throw new Error('Unable to find that address.')
    }
    let lat = response.data.results[0].locations[0].latLng.lat;
    let lng = response.data.results[0].locations[0].latLng.lng;
    const weatherUrl = `https://api.darksky.net/forecast/2ec215943bff44a7adfa670751873621/${lat},${lng}`;
  console.log(response.data.results[0].providedLocation.location);
  return axios.get(weatherUrl);
})
  .then(response => {
    const temperature = convertFahrenheitToCelsius(response.data.currently.temperature);
    const apparentTemperature = convertFahrenheitToCelsius(response.data.currently.apparentTemperature);
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
  })
  .catch(e => {
    if (e.code === 'ENOTFOUND') {
      console.log('Unable to connect to server.');
    } else {
      console.log(e.message);
    }
});
