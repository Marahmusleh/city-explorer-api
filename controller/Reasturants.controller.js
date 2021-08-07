'use strict';

const { default: axios } = require('axios');
const Restaurants = require('../models/Restaurants');
const YELP_API_KEY = process.env.YELP_API_KEY;

let inMemory = {};
const getRestaurant = async (req, res) => {
  let query1 = req.query.cityName;
  const ENDPOINT = '/businesses/search';

  if (inMemory[query1] !== undefined) {
    console.log('We already have the data');
    res.status(200).send(inMemory[query1]);
  } else {
    const yelpREST = axios.create({
      baseURL: `https://api.yelp.com/v3/businesses/search?location=${query1}`,
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
        'Content-type': 'application/json',
      },
    });
    yelpREST(ENDPOINT, { params: { key: ENDPOINT } })
      .then(({ data }) => {
        let yelpObj = data.businesses.map((service) => {
          return new Restaurants(service);
        });
        inMemory[query1] = yelpObj;
        res.status(200).send(yelpObj);
      })
      .catch((error) => {
        res.send(error);
      });
  }
};
module.exports = getRestaurant;
