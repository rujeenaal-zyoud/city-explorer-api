'use strict';

require('dotenv').config();
const express = require('express'); //we should install it in terminal
const weatherData = require('./data/weather.json');
// the cors from node.js bakage 
const cors = require('cors');
const server = express();
const PORT = process.env.PORT;
server.use(cors()); //  make my server opened for anyone

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

 server.get('/movies', movieHandler)

function weatherHandler(req, res) {
    let weatherCityData = req.query.city;
    let keyW = process.env.WEATHER_API;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${weatherCityData}&key=${keyW}`

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

  function movieHandler(req, res) {
  let movie = req.query.query;
    let keyM = process.env.MOVIE_API;
    let urlM = `https://api.themoviedb.org/3/search/movie?api_key=${keyM}&query=${movie}`


    axios
        .get(url)
        .then(result => {
            console.log('inside promise')
            let moiveArr = movie.data.map(item => {
                return new Movie(item)
            })
            res.send(moiveArr)
        })
        .catch(err => {
            res.status(500).send(`error in getting the photo data ==> ${err}`);
        })

    console.log('after aaxios');

    }


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
