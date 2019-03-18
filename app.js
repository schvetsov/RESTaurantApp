const express = require('express')
const app = express()
const yelp = require('yelp-fusion');
const { yelpKey, googleKey } = require('./config');
const client = yelp.client(yelpKey);
const googleMapsClient = require('@google/maps').createClient({
  key: googleKey,
  Promise: Promise
});
color = '';
directions = '';

app.get('/yelp', (req, res) => {
    'use strict';

    client.search({
      term: req.query.input,
      // location:'jacksonville, fl',
      latitude: req.query.latitude,
      longitude: req.query.longitude
      // latitude: 30.3252846,
      // longitude: -81.6637657
    })
    // .then(response => {
      // color = response.jsonBody.businesses
      // color = response.jsonBody.businesses[0].name
      // console.log(color)
    // })
    .then(response => {
      // console.log(response.jsonBody.businesses),
      res.status(200).send({
        color:response.jsonBody.businesses
      })
    })
    .catch(err => {
      console.log(err);
    });
    // console.log('Hello world')
    //  res.status(200).send({
    //    color:color
    //  })
    //console.log('Get working')
})

app.get('/directions', (req, res) => {

  googleMapsClient.directions({
    origin:[req.query.origLat,req.query.origLong],
    // origin:[30.3252846,-81.6637657],
    destination:[req.query.destLat,req.query.destLong],
    // origin:[30.2915584,-81.5218688],
    // destination:[30.34649,-81.52478]
  })
  .asPromise()
  .then((response) => {
    // console.log(response.json.results);
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
