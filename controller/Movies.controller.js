const MOVIES_API_KEY= process.env.MOVIES_API_KEY
const axios =require('axios');
const Movies = require('../models/Movies');


const getMovies = async (req, res) => {
    let city = req.query.query
  
    let moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIES_API_KEY}&query=${city}`
    axios.get(moviesUrl).then(response => {
    let  movies = response.data.results;
  
      let callMovies = movies.map(el => {
        return new Movies(el);
      });
      res.send(callMovies);
      
    }).catch(error=>res.send({message:error.message}));
  };
module.exports = getMovies;