
const axios = require('axios');
//const superagent = require('superagent');


function weatherHandler(req, res) {
    let weatherCityData = req.query.city_name;
    let keyW = process.env.WEATHER_API;

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${weatherCityData}&key=${keyW}`

       axios .get(url)
        .then(result => {

            let foccasrtDataArr = result.data.data.map(item => new Forecast(item))
           // return foccasrtDataArr ;
            res.status(200).send(foccasrtDataArr)
        })
      
          
.catch(console.error)
}

class Forecast {
    constructor(item) {

        this.date = item.valid_date
        this.descrption = item.weather.description;


    }
}

module.exports = weatherHandler;

//module .exports = new Forecast;