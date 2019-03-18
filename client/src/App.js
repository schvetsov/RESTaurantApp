import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Maps from './Maps';
// result2= [];

class App extends Component {
  constructor() {
    super();
    this.state = {
      result: [],
      lat: [],
      lon: [],
      result2: 'hi',
      test: [1,2,3,4],
      initialPosition: 0,
      lastPosition: 0,
      distance: []
    };
    this.doSearch = this.doSearch.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.getDirections = this.getDirections.bind(this);
  }
componentWillMount() {

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

    // axios.get('/yelp')
    // .then(res => console.log(res.data.color))
    // .catch(err => console.log(err));
}

doSearch() {
let result2= [];
let lat = [];
let lon = [];
let dist = [];
  axios.get('/yelp', {
    params: {
      latitude: this.state.initialPosition,
      longitude: this.state.lastPosition
    }
  })
  // .then(res => 
  //   console.log(res.data.color[0].name),
  // )
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

    // Object.keys(res.data.color[0]).map(igKey => {
    //   return [...Array(res.data.color[0][igKey])].map((_, i) => {
    //     return result2.push(res.data.color[0][i])
    //   });
    // })
  })
    .then(res =>
      {this.setState({
        result: result2,
        lat: lat,
        lon: lon,
        distance: dist
      })})
  .catch(err => console.log(err))
}

getDirections() {
  let dist = [];
  for(let i=0; i<this.state.lat.length; i++) {
    axios.get('/directions', {
      params: {
        origLat: this.state.initialPosition,
        origLong: this.state.lastPosition,
        destLat: this.state.lat[i],
        destLong: this.state.lon[i]
      }
    })
    .then(res => {
      // console.log(res.data.directions[0].legs[0].distance.text)
      dist.push(res.data.directions[0].legs[0].distance.text);
    })
    .then(res =>
      {this.setState({
        distance: dist
      })})
    .catch(err => {
      console.log(err)
    })
  }
  // axios.get('/directions', {
  //   params: {
  //     origLat: this.state.initialPosition,
  //     origLong: this.state.lastPosition,
  //     destLat: this.state.lat[0],
  //     destLong: this.state.lon[0]
  //   }
  // })
  // .then(res => {
  //   // console.log(res.data.directions[0].legs[0].distance.text)
  //   dist.push(res.data.directions[0].legs[0].distance.text);
  // })
  // .then(res =>
  //   {this.setState({
  //     distance: dist
  //   })})
  // .catch(err => {
  //   console.log(err)
  // })
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
    const items = this.state.result.map((i, j) => <tr key={j}>{i}</tr>)
    const items2 = this.state.lat.map((i, j) => <tr key={j}>{i}</tr>)
    const items3 = this.state.lon.map((i, j) => <tr key={j}>{i}</tr>)
    const items4 = this.state.lon.map((i, j) => <button onClick={this.getDirections}>Get directions</button>)
    const center = {
      lat: this.state.initialPosition,
      lng: this.state.lastPosition
    }
    return (
      <div className="App">
        {/* <Maps 
          center={center}
        /> */}
        <button onClick={this.doSearch}>Click me</button>
        <button onClick={this.getLocation}>Get coordinates</button>
        <button onClick={this.getDirections}>Get directions</button>
        {/* {this.state.result} */}
        {this.state.initialPosition}
        {this.state.lastPosition}
        <table>
          <tr>
            <td>{items}</td>
            <td>{items2}</td>
            <td>{items3}</td>
            <td>{items4}</td>
          </tr>
        </table>
      </div>
    );
  }
}

export default App;


