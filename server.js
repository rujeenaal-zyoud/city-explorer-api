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

server.get('/weather', weatherHandler)

function weatherHandler(req, res) {
    let weatherCityData = req.query.city_name;
    let key = process.env.UNSPLASH_KEY;
    let url = `https://api.weatherbit.io/v2.0/forcast/daily?query=${weatherCityData}?key=${key}`

    let weatherCity = weatherData.find(city => {
        if (city.city_name.toLowerCase() == weatherCityData.toLowerCase()) {
            return city
    
        }
    
    });

    axios
        .get(url)
        .then(result => {
            console.log('inside promise')

            let foccasrtDataArr = weatherCity.data.map(item => {
                return new Forecast(item)
            })
            res.send(foccasrtDataArr)
        })
        .catch(err => {
            res.status(500).send(`error in getting the photo data ==> ${err}`);
        })

    console.log('after aaxios');
}

// ....
 server.get('/moive', moiveHandler)

 function moiveHandler(req, res) {
  let movie = req.query.query;
    let keyM = process.env.MOVIE_API;
    let urlM = `https://api.themoviedb.org/3/search/movie?api_key=${keyM}&query=${movie}`

//     let weatherCity = weatherData.find(city => {
//         if (city.city_name.toLowerCase() == weatherCityData.toLowerCase()) {
//             return city
    
//         }
    
//     });

//     axios
//         .get(url)
//         .then(result => {
//             console.log('inside promise')

//             let foccasrtDataArr = weatherCity.data.map(item => {
//                 return new Forecast(item)
//             })
//             res.send(foccasrtDataArr)
//         })
//         .catch(err => {
//             res.status(500).send(`error in getting the photo data ==> ${err}`);
//         })

//     console.log('after aaxios');
// }


class Forecast {
    constructor(arr) {

        this.date = arr.valid_date
        this.descrption = arr.weather.description;


    }
}

class Movie {
    constructor(movieCons) {
      this.title = movieCons.title;
      this.overview = movieCons.overview;
      this.popularity = movieCons.popularity;
      this.vote_average=movieCons.vote_average;
      this.release_date=movieCons.release_date;
      this.poster_path=movieCons.poster_path
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
