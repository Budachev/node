const yargs = require('yargs');
const axios = require('axios');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
        a: {
            demand: true,
            string: true,
            alias: 'address',
            describe: ' Address to fetch data'
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

const encodedAddress = encodeURIComponent(argv.address);
const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

const key = '3b1dfe55970d15a79da627f85eb0e7';


axios.get(url).then(response => {
    if (response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address');
    }
    const {lat, lng} = response.data.results[0].geometry.location;
    const weatherUrl = `https://api.darksky.net/forecast/${key}/${lat},${lng}`;

    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then(response => {
    const {temperature, apparentTemperature} = response.data.currently;
    console.log(`In's currently ${temperature}. It feels lite ${apparentTemperature}`);
})
.catch(e => {
    console.log(e.message);
})

// geocode.geocodeAdress(argv.address, (errorMsg, results) => {
//     if (errorMsg) {
//         console.log(errorMsg);
//     } else {
//         console.log(JSON.stringify(results, null, 2));
//         const result = weather.getWeather(results.lat, results.lng, (errorMsg, weatherResults) => {
//             if (errorMsg) {
//                 console.log(errorMsg);
//             } else {
//                 console.log(JSON.stringify(weatherResults, null, 2))
//             }
//         });
//     }
// });

