'use strict'

const express = require('express');
const axios = require('axios')
const server = express();

// const weatherData = require('./data/weather.json');

require('dotenv').config();
const PORT = process.env.PORT

const cors = require('cors');
server.use(cors());

const getWeather = require('./controller/Forecast.controller')
const getMovies = require('./controller/Movies.controller');



server.get('/', (req, res) => {
    res.send('Hello from backend');
});
server.get('/weather', getWeather);

server.get('/movies', getMovies);

server.listen(PORT, () => console.log(`listening on ${PORT}`));