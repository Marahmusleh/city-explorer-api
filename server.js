'use strict'

const express = require('express');
const axios = require('axios')
const server = express();

// const weatherData = require('./data/weather.json');

require('dotenv').config();
const PORT = process.env.PORT
const WEATHER_API_KEY = process.env.WEATHER_API_KEY
const WEATHER_API_URL = process.env.WEATHER_API_URL
const MOVIES_API_KEY= process.env.MOVIES_API_KEY
const cors = require('cors');
server.use(cors());

const Forecast = require('./models/Forecast')
const Movies = require('./models/Movies')



server.get('/', (req, res) => {
    res.send('Hello from backend');
});
server.get('/weather', async (req, res) => {

        let { lat, lon } = req.query;
        const response = await axios.get(`${WEATHER_API_URL}?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`)
        const forecastArr = response.data.data.map(items => new Forecast(items));
        console.log(forecastArr);
        res.json(forecastArr);
   
});

server.get('/movies', (req, res) => {
    let city = req.query.query
  
    let moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIES_API_KEY}&query=${city}`
    axios.get(moviesUrl).then(response => {
    let  movies = response.data.results;
  
      let callMovies = movies.map(el => {
        return new Movies(el);
      });
      res.send(callMovies);
      
    }).catch(error=>res.send({message:error.message}));
  });

server.listen(PORT, () => console.log(`listening on ${PORT}`));