'use strict'

const express = require('express');
const server = express();

const weatherData = require('./data/weather.json');

require('dotenv').config();
const PORT = process.env.PORT

const cors = require('cors');
server.use(cors());


class Forecast {
    constructor(value) {
        this.valid_date = value.valid_date;
        this.description = ` ${value.weather.description}`;
    }
}

server.get('/', (req, res) => {
    res.send('Hello from backend');
});
server.get('/weather', (req, res) => {

    try {
        let { searchQuery, lat, lon } = req.query;
        let cityData = weatherData.find(element =>
            element.city_name.toLowerCase() === searchQuery.toLowerCase() ||
            (element.lat === lat && element.lon === lon) // to search by city or (lat+lon)
        );
        let forecastArr = cityData.data.map(items => new Forecast(items));
        console.log(forecastArr);
        res.send(forecastArr);
    }
    catch (e) {
        res.status(500).send('No Data for this City');
     }
});

server.listen(PORT, () => console.log(`listening on ${PORT}`));