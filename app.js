const express = require('express')
const app = express()
const yelp = require('yelp-fusion');
const { yelpKey, googleKey } = require('./config');
const client = yelp.client(yelpKey);
const googleMapsClient = require('@google/maps').createClient({
  key: googleKey,
  Promise: Promise
});
// color = '';
// directions = '';

app.get('/yelp', (req, res) => {
    'use strict';

    client.search({
      term: req.query.input,
      latitude: req.query.latitude,
      longitude: req.query.longitude
    })
    .then(response => {
      res.status(200).send({
        color:response.jsonBody.businesses
      })
    })
    .catch(err => {
      console.log(err);
    });
})

app.get('/directions', (req, res) => {

  googleMapsClient.directions({
    origin:[req.query.origLat,req.query.origLong],
    destination:[req.query.destLat,req.query.destLong],
  })
  .asPromise()
  .then((response) => {
    res.status(200).send({
      directions:response.json.routes
    });
  })
  .catch((err) => {
    console.log(err);
  });

})


var port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}`))
