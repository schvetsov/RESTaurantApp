const express = require('express');
const router = express.Router();
const { googleKey } = require('../config');
const googleMapsClient = require('@google/maps').createClient({
    key: googleKey,
    Promise: Promise
});

router.get('/directions', (req, res) => {

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

  module.exports = router;