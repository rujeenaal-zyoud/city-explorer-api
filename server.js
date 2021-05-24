// 'use strict';
//this becuse use env in termainal and also we should
//create .env file after it and put the port in 
//Create a .env file in the root directory of your project. Add environment-specific 
require('dotenv').config();
// requre mean import in server side 
//express that mean using framework with require function 
const express = require('express'); //we should install it in terminal
const weatherData = require ('./data/weather.json');
// the cors from node.js bakage 
//Certain CORS requests are considered 'complex' and require an initial OPTIONS request (called the "pre-flight request").
const cors = require('cors');
const server = express();
server.use(cors()); //  make my server opened for anyone
// create port with number dirctly like 
// const PORT =3001;
// But snice we use .env so did'nt need the abovw line declaration 

// http://localhost:3001/
// the status we can write it or not is't necssery
//step 2

      // step 3
// http://localhost:3001/test
server.get('/', (request, response) => {
    let str = 'hello from back end';
    response.status(202).send(str);
})
// step 4
// http://localhost:3001/weather
server.get('/test', (request, response) => {
    console.log(request.query)
    //create function to  get data weather from 
    const weatherCity =weatherData.data.map(i => new Weather(i))
    response.status(200).send(weatherCity)
    });
// // step 5
// if we search about something wrong 
server.get('*', (req, res) => {
    res.status(404).send('not found');
})

class Weather {
    constructor(data){
        
    this.date = data.valid_date;
    this.description = data.weather.description;
    }
}


const PORT =process.env.PORT;
// step 1 do listening 
server.listen(PORT,()=>{
    console.log(`listening on PORT ${PORT}`);
})
