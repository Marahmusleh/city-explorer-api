const MOVIES_API_KEY= process.env.MOVIES_API_KEY
const axios =require('axios');
const Movies = require('../models/Movies');
const Cache = require('../helper/cache.helper');
// const { response, query } = require('express');
// const { query } = require('express');
let cacheObject = new Cache();

const getMoviesData = async (query)=>{
  console.log('getting the data from API');

let moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIES_API_KEY}&query=${query}`
let film = await axios.get(moviesUrl)
let  callMovies = film.data.results.map((items) => new Movies(items));

  cacheObject.aflam.push({
    "query": query,
    "data": callMovies
  })
  return callMovies;
};


const getMovies = async (req, res) => {
    let {query} = req.query;

    if((Date.now() - cacheObject.timeStamp) > 86400000){ // reset the cache object if the timeStamp exeeds 1 day
      cacheObject = new Cache();
  }
    if(cacheObject.aflam.length){
     const filteredData = cacheObject.aflam.find((movie) =>{
       return movie.query === query;
     });
     if(filteredData){
      console.log('getting the data from cache');
       res.send(filteredData.data)
     } else{
       res.send(await getMoviesData(query));
     }
    } else {
      res.send(await getMoviesData(query));
    }

   
  };
module.exports = getMovies;