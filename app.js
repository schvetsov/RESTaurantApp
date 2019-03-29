const express = require('express')
const app = express()
const yelpRoute = require('./routes/yelp');
const googleRoute = require('./routes/directions');

app.use('/yelp', yelpRoute);

app.use('/directions', googleRoute);

var port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}`))
