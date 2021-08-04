const axios =require('axios');
const Forecast = require('../models/Forecast');
const WEATHER_API_KEY = process.env.WEATHER_API_KEY
const WEATHER_API_URL = process.env.WEATHER_API_URL

const getWeather = async (req, res) => {
    let { lat, lon } = req.query;
    const response = await axios.get(`${WEATHER_API_URL}?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`)
    const forecastArr = response.data.data.map(items => new Forecast(items));
    console.log(forecastArr);
    res.json(forecastArr);
}
module.exports = getWeather;