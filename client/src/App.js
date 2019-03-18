import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Container from './components/container';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      result: [],
      lat: [],
      lon: [],
      distance: [],
      location: [],
      rating: [],
      reviews: [],
      phone: [],
      result2: 'hi',
      test: [1,2,3,4],
      initialPosition: 0,
      lastPosition: 0
    };
    this.doSearch = this.doSearch.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


handleChange(event) {
  this.setState({input: event.target.value});
}

componentWillMount() {

  var getPosition = function (options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }
  
  getPosition()
    .then((position) => {
      var crd = position.coords;
      this.setState({
        initialPosition: crd.latitude,
        lastPosition: crd.longitude
      })
    })
    .catch((err) => {
      console.error(err.message);
    });

    // axios.get('/yelp')
    // .then(res => console.log(res.data.color))
    // .catch(err => console.log(err));
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
      input: this.state.input,
      latitude: this.state.initialPosition,
      longitude: this.state.lastPosition
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
    .then(res =>
      {this.setState({
        result: result2,
        lat: lat,
        lon: lon,
        location: location,
        distance: dist,
        rating: rating,
        reviews: reviews,
        phone: phone
      })})
  .catch(err => console.log(err))
}

getLocation() {

  var getPosition = function (options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }
  
  getPosition()
    .then((position) => {
      console.log(position);
      var crd = position.coords;
      this.setState({
        initialPosition: crd.latitude,
        lastPosition: crd.longitude
      })
    })
    .catch((err) => {
      console.error(err.message);
    });

}

  render() {
    const items = this.state.result.map((_,i) => <Container key={i + 1}
      number={i}
      result={this.state.result}
      origLat={this.state.initialPosition}
      origLong={this.state.lastPosition}
      latitude={this.state.lat}
      longitude={this.state.lon}
      distance={this.state.distance}
      location={this.state.location}
      rating={this.state.rating}
      reviews={this.state.reviews}
      phone={this.state.phone}
      />)
    return (
      <div className="App">
        <input type="text" value={this.state.input} onChange={this.handleChange}></input>
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

export default App;


