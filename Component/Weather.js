const axios = require('axios');
//const superagent = require('superagent');


let WinMemory={};
function weatherHandler(req, res) {
    let weatherCityData = req.query.city_name;
    let keyW = process.env.WEATHER_API;

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${weatherCityData}&key=${keyW}`


    if (WinMemory[weatherCityData] !== undefined) {
        console.log('get the Weather data from the Memory')
        res.send(WinMemory[weatherCityData])
      } 
      else {
        console.log('get the Weather data from the API');
        axios
          .get(url)
            .then(result => {
                let foccasrtDataArr = result.data.data.map(item => new Forecast(item))              //
                WinMemory[weatherCityData] = foccasrtDataArr;
            res.status(200).send(WinMemory[weatherCityData]);
          })
          .catch(err => {
            //console.err('error', err);
            res.status(500).send('error', err);
          })

}
}
//



class Forecast {
    constructor(item) {
        this.date = item.valid_date
        this.descrption = item.weather.description;
    }
}
module.exports = weatherHandler;