import { connect } from 'react-redux';

export const dispatch = (value) => {
    this.props.dispatch({ type: "CHANGEINPUT", value: value })
  };

export const dispatch1 = (value) => {
    value = {
    value1: value.latitude,
    value2: value.longitude
    }
    this.props.dispatch({ type: "GEOLOCATION", value: value })
};

export const dispatch2 = (value) => {
    value = {
    result: value.result,
    lat: value.lat,
    lon: value.lon,
    location: value.location,
    distance: value.distance,
    rating: value.rating,
    reviews: value.reviews,
    phone: value.phone
    }
    this.props.dispatch({ type: "YELPRESPONSE", value: value })
};

export default connect()

// module.exports = {
//     dispatch:dispatch,
//     dispatch1:dispatch1,
//     dispatch2:dispatch2
// }