const axios = require('axios');

module.exports =movieHandler;

function movieHandler(req, res) {
    

let keyM = process.env.MOVIE_API;
    let movie = req.query.query;
    let urlM = `https://api.themoviedb.org/3/search/movie?api_key=${keyM}&query=${movie}`


    axios.get(urlM)
        .then(result => {
            let moiveArr = result.data.results.map(item => new Movie(item));
            res.status(200).send(moiveArr);

        })
      
        .catch(console.error)
    }




class Movie {
    constructor(item) {
        this.title = item.title;
        this.overview = item.overview;
        this.popularity = item.popularity;
        this.vote_average = item.vote_average;
        this.release_date = item.release_date;
        //this.poster_path = item.poster_path;

    }
}