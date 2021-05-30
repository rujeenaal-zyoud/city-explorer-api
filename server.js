'use strict';
require('dotenv').config();
const express = require('express'); //we should install it in terminal
const cors = require('cors');
const server = express();
server.use(cors()); //  make my server opened for anyone
const axios = require('axios');

const Weather =require('./Component/Weather')
const Movie = require('./Component/Movie')

//we should impoert the functions in modules(Companant)
const weatherHandler =require('./Component/Weather.js')
const movieHandler =require('./Component/Movie.js')

server.get('/', (request, response) => {
    let str = 'hello from back end';
    response.status(202).send(str);
})


const PORT = process.env.PORT || 3000 ;
let WinMemory={};

server.get('/weather', function weatherHandler(req, res) {
    let weatherCityData = req.query.city_name;
    let keyW = process.env.WEATHER_API;
console.log('weatherCityData',weatherCityData);
console.log("keyW",keyW);
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${weatherCityData}&key=${keyW}`
// add memory for API request

    if (WinMemory[weatherCityData] !== undefined) {
        console.log('get the Weather data from the Memory')
        res.send(WinMemory[weatherCityData])
      } 
      else {
        console.log('get the Weather data from the API');
        axios
          .get(url)
            .then(result => {
                console.log('inside axios ',result.data)
                let foccasrtDataArr = result.data.data.map(item => new Forecast(item))              //
                WinMemory[weatherCityData] = foccasrtDataArr;
            res.status(200).send(WinMemory[weatherCityData]);
          })
          .catch(err => {
            //console.err('error', err);
            res.status(500).send('error', err);
          })
          
          

}
});

class Forecast {
    constructor(item) {

        this.date = item.valid_date
        this.descrption = item.weather.description;


    }
}

server.get('/movies', movieHandler);






// // step 5
// if we search about something wrong 
server.get('*', (req, res) => {
    res.status(404).send('not found');
})

// step 1 do listening 
server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
})
