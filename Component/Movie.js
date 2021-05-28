const axios = require('axios');

module.exports =movieHandler;

let inMemory={};
function movieHandler(req, res) {
    

let keyM = process.env.MOVIE_API;
    let movie = req.query.query;
    let urlM = `https://api.themoviedb.org/3/search/movie?api_key=${keyM}&query=${movie}`

    if (inMemory[movie] !== undefined) {
        console.log('get the Moive data from the Memory')
        res.send(inMemory[movie])
      } 
      
      else {
        console.log('get the Moive data  from the API');
        axios
          .get(urlM)
            .then(result => {
                let moiveArr = result.data.results.map(item => new Movie(item));
              //
            inMemory[movie] = moiveArr;
            res.status(200).send(inMemory[movie]);

    
          })
          .catch(err => {
            console.err('error', err);
            response.status(500).send('error', err);
          })
      }
//

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