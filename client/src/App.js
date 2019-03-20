import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Container from './components/container';
import { connect } from 'react-redux';

class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.doSearch = this.doSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  dispatch = (value) => {
    this.props.dispatch({ type: "CHANGEINPUT", value: value })
  };

  dispatch1 = (value) => {
    value = {
      value1: value.latitude,
      value2: value.longitude
    }
    this.props.dispatch({ type: "GEOLOCATION", value: value })
  };

  dispatch2 = (value) => {
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

  handleChange(event) {
    this.dispatch(event.target.value)
  }

  componentDidMount() {

    var getPosition = function (options) {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
    }
    
    getPosition()
      .then((position) => {
        var crd = position.coords;
        this.dispatch1(crd)

      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  doSearch() {

    let result2= [];
    let lat = [];
    let lon = [];
    let location = [];
    let dist = [];
    let rating = [];
    let reviews = [];
    let phone = [];

    axios.get('/yelp', {
      params: {
        input: this.props.input,
        latitude: this.props.origLat,
        longitude: this.props.origLong
      }
    })
    .then(res => {
      for (let i=0; i<res.data.color.length; i++) {
        result2.push(res.data.color[i].name);
      }
      for (let i=0; i<res.data.color.length; i++) {
        lat.push(res.data.color[i].coordinates.latitude);
      }
      for (let i=0; i<res.data.color.length; i++) {
        lon.push(res.data.color[i].coordinates.longitude);
      }
      for (let i=0; i<res.data.color.length; i++) {
        location.push(res.data.color[i].location.display_address[0]);
      }
      for (let i=0; i<res.data.color.length; i++) {
        rating.push(res.data.color[i].rating);
      }
      for (let i=0; i<res.data.color.length; i++) {
        reviews.push(res.data.color[i].review_count);
      }
      for (let i=0; i<res.data.color.length; i++) {
        phone.push(res.data.color[i].phone);
      }
      for (let i=0; i<res.data.color.length; i++) {
        dist.push(res.data.color[i].distance);
      }
    })
    .then(res => {
      let value = {
        result: result2,
        lat: lat,
        lon: lon,
        location: location,
        distance: dist,
        rating: rating,
        reviews: reviews,
        phone: phone
      }
      this.dispatch2(value)
    })
    .catch(err => console.log(err))
  }

  render() {

    const items = this.props.result.map((_,i) => 
      <Container key={i + 1}
        number={i}
        result={this.props.result}
        origLat={this.props.origLat}
        origLong={this.props.origLong}
        latitude={this.props.lat}
        longitude={this.props.lon}
        distance={this.props.distance}
        location={this.props.location}
        rating={this.props.rating}
        reviews={this.props.reviews}
        phone={this.props.phone}
      />)

    return ( 
      <div className="App">
        <input type="text" value={this.props.input} onChange={this.handleChange}></input>
        <button onClick={this.doSearch}>Search</button>
        <div className="flex-container">
          <div className="name">Name</div>
          <div className="location">Location</div>
          <div className="rating-review-distance">Rating</div>
          <div className="rating-review-distance">Number of Reviews</div>
          <div className="phone">Phone</div>
          <div className="rating-review-distance">Distance in Miles</div>
          <div className="location">Directions</div>
        </div>
        {items}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  input: state.input,
  origLat: state.origLat,
  origLong: state.origLong,
  result: state.result,
  lat: state.lat,
  lon: state.lon,
  location: state.location,
  distance: state.distance,
  rating: state.rating,
  reviews: state.reviews,
  phone: state.phone,
  instructions: state.instructions
})

export default connect(mapStateToProps)(App);
