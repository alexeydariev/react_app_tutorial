const request = require('request-promise');

const API_KEY = `95bd021121df0d3eac2779f1a6b2b1bf`;

class Weather {
    static retrieveByCity (city, callback) {
        request({
            uri: `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`,
            json: true
        }).then(function (res){
            callback(res);
        }).catch(function (err){
            console.log(err);
            callback({err: 'Could not reach OpenWeatherAPI. '});
        })
    }
}

module.exports = Weather;