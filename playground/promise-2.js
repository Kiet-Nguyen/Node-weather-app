const request = require('request');

const geocodeAddress = address => {
  return new Promise((resolve, reject) => {
    const encodedAddress = encodeURIComponent(address);

    request({
      url: `http://www.mapquestapi.com/geocoding/v1/address?key=uDry3iTzgERHtuHWl4ZOK6yCxaXHmNGE&location=${encodedAddress}`,
      json: true,
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect to server.');
      } else if (body.info.statuscode === 400) {
        reject('Unable to find that address.');
      } else if (body.info.statuscode === 0) {
        resolve({
          address: body.results[0].providedLocation.location,
          latitude: body.results[0].locations[0].latLng.lat,
          longitude: body.results[0].locations[0].latLng.lng
        });
      }
    });
  });
};

geocodeAddress('19146').then(location => {
  console.log(JSON.stringify(location, undefined, 2));
}, errorMessage => {
  console.log(errorMessage);
})
