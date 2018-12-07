const request = require('request');

const geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);

  request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=uDry3iTzgERHtuHWl4ZOK6yCxaXHmNGE&location=${encodedAddress}`,
    json: true,
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to server.');
    } else if (body.info.statuscode === 400) {
      callback('Unable to find that address.');
    } else if (body.info.statuscode === 0) {
      callback(undefined, {
        address: body.results[0].providedLocation.location,
        latitude: body.results[0].locations[0].latLng.lat,
        longitude: body.results[0].locations[0].latLng.lng
      });
    }
  });
};

module.exports = {
  geocodeAddress,
};
