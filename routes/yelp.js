const express = require('express');
const router = express.Router();
const yelp = require('yelp-fusion');
const { yelpKey } = require('../config');
const client = yelp.client(yelpKey);

router.get('/yelp', (req, res) => {

    client.search({
      term: req.query.input,
      latitude: req.query.origLat,
      longitude: req.query.origLong
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

module.exports = router;