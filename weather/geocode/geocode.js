const request = require('request');

const geocodeAdress = (address, callback) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

    request({
        url,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Google servers.');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address.');
        } else if (body.status === 'OK') {
            const result = body.results[0];
            const {lat, lng} = result.geometry.location;

            callback(undefined, {
                address: result.formatted_address,
                lat, 
                lng
            });
        }
    });
}

module.exports.geocodeAdress = geocodeAdress;