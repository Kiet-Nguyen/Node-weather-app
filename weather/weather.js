const request = require('request');

const convertFahrenheitToCelsius = fahrenheit => {
  const celsius = Math.round(((fahrenheit - 32) * 5) / 9);
  return celsius;
}

const getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/2ec215943bff44a7adfa670751873621/${lat},${lng}`,
    json: true,
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: convertFahrenheitToCelsius(body.currently.temperature),
        apparentTemperature: convertFahrenheitToCelsius(body.currently.apparentTemperature),
      });
    } else {
      callback('Unable to connect to server.');
    }
  });
};

module.exports.getWeather = getWeather;
