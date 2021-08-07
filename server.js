'use strict'

const express = require('express');
const server = express();


require('dotenv').config();
const PORT = process.env.PORT

const cors = require('cors');
server.use(cors());

const getWeather = require('./controller/Forecast.controller')
const getMovies = require('./controller/Movies.controller');
const getRestaurant  = require('./controller/Reasturants.controller');



server.get('/', (req, res) => {
    res.send('Hello from backend');
});
server.get('/weather', getWeather);

server.get('/movies', getMovies);

server.get('/yelp' , getRestaurant);


server.listen(PORT, () => console.log(`listening on ${PORT}`));