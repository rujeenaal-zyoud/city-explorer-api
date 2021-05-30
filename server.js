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


const PORT = process.env.PORT  ;

server.get('/weather',weatherHandler );


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
