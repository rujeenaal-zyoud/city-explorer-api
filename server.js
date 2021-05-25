'use strict';
//this becuse use env in termainal and also we should
//create .env file after it and put the port in 
//Create a .env file in the root directory of your project. Add environment-specific 
require('dotenv').config();
// requre mean import in server side 
//express that mean using framework with require function 
const express = require('express'); //we should install it in terminal
const weatherData = require('./data/weather.json');
// the cors from node.js bakage 
//Certain CORS requests are considered 'complex' and require an initial OPTIONS request (called the "pre-flight request").
const cors = require('cors');
const server = express();
const PORT = process.env.PORT;
server.use(cors()); //  make my server opened for anyone
// create port with number dirctly like 
// const PORT =3001;
// But snice we use .env so did'nt need the abovw line declaration 

// http://localhost:3001/
server.get('/', (request, response) => {
    let str = 'hello from back end';
    response.status(202).send(str);
})


// step 3
// http://localhost:3001/test
server.get('/test', (req, res) => {
    res.send('test Weather Data')

})

// step 4
// http://localhost:3001/weather?city_name=Amman?lat=31.95?lon=35.91
server.get('/weather', (req, res) => {
    let weatherCityData = req.query.city_name;
    let weatherLatData = req.query.lat;
    let weatherLonData = req.query.lon;
    let cityData;

    //create function to  get data weather from 
    //
    let weatherCity = weatherData.find(city => {
        if (city.city_name ==weatherCityData&& city.lat == weatherLatData && city.lon == weatherLonData ) {
            cityData = new Forecast(city)
            return city

        }

    });
    //console.log(weatherCityData)
    res.send(cityData)

})

//here example what we want in class 
// "description": "Low of 17.5, high of 29.9 with few clouds",
//     "date": "2021-04-01
class Forecast {
    constructor(arr) {
        this.data = arr.data.map(i => {
            let low = i.low_temp;
            let high = i.max_temp;
            return { 'description': 'low of' + low + ',high of' + high + 'with' + i.weather.description, 'date': i.datetime }

        })


    }
}


// // step 5
// if we search about something wrong 
server.get('*', (req, res) => {
    res.status(404).send('not found');
})

// step 1 do listening 
server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
})
