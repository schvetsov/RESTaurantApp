import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SmallCard from './containers/SmallCard';
import BigCard from './containers/info/BigCard';
import { connect } from 'react-redux';

class App extends Component {

  constructor() {
    super();
    this.state = {};
    this.doSearch = this.doSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getDirections = this.getDirections.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.getDirections = this.getDirections.bind(this);
  }

  dispatch = (value) => {
    this.props.dispatch({ type: "CHANGEINPUT", value: value })
  };

  dispatch1 = (value) => {
    this.props.dispatch({ type: "GEOLOCATION", value: value })
  };

  dispatch2 = (value) => {
    this.props.dispatch({ type: "YELPRESPONSE", value: value })
  };

  dispatch3 = (value) => {
    this.props.dispatch({ type: "DIRECTIONS", value: value })
  };

  dispatch4 = (value) => {
    this.props.dispatch({ type: "SELECTED", value: value })
  };

  //Update state for text input
  handleChange(event) {
    this.dispatch(event.target.value)
  }

  //Get user coordinates when app loads
  componentDidMount() {

    var getPosition = function (options) {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
    }
    
  getPosition()
    .then((position) => {
      const value = {
        value1: position.coords.latitude,
        value2: position.coords.longitude
      }
      this.dispatch1(value)
    })
    .catch((err) => {
      console.error(err.message);
    });
  }

  //Do the search on Yelp
  doSearch() {
    axios.get('/yelp/yelp', {
      params: {
        input: this.props.input,
        origLat: this.props.origLat,
        origLong: this.props.origLong
      }
    })
    .then(res => {
      let directions = [];
      for(let i = 0; i < res.data.color.length; i++) {
        directions.push([]);
      }
      const value = {
        selected: '',
        data: res.data.color,
        directions: directions
      }
      this.dispatch2(value);
      console.log(this.props.result);
    })
    .catch(err => console.log(err))

  }

  getInfo(val) {
    const value = {
      data: this.props.result[val],
      index: val
    }
    this.dispatch4(value)
  }

  //Get directions from Google Directions API
  getDirections(value) {

    //If we already have directions, then abort
    if(this.props.directions[this.props.index].length !== 0){
      console.log("GET aborted");
      return;
    }

    let directions = this.props.directions;
    
    axios.get('/directions/directions', {
      params: {
        origLat: this.props.origLat,
        origLong: this.props.origLong,
        destLat: value.latitude,
        destLong: value.longitude
      }
    })
    .then(res => {
      let result = res.data.directions[0].legs[0];
      for (let i = 0; i < result.steps.length; i++) {
        let data = result.steps[i].html_instructions + '---' + 
          result.steps[i].distance.text + '---' + 
          result.steps[i].duration.text;
        directions[this.props.index].push(data)
      }
      const value = {
        directions: directions,
        index: this.props.index
      }
      this.dispatch3(value)
      console.log("GET request to Google accomplished");
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {

    const items = this.props.result.map((_,i) => 
      <SmallCard
        key={i + 1}
        number={i}
        result={this.props.result[i]}
        origLat={this.props.origLat}
        origLong={this.props.origLong}
        getInfo={this.getInfo}
      />)

    return ( 
      <div className="App">
        <div className="left-screen">
          <div className="search">
            <input type="text" value={this.props.input} onChange={this.handleChange}></input>
            <button onClick={this.doSearch}>Search</button>
          </div>
          <div className="actors-list">{items}</div>
        </div>

        {this.props.selected ?
          <BigCard 
            selected={this.props.selected}
            index={this.props.index}
            getDirections={this.getDirections}
            directions={this.props.directions}
          />
        :
          <div></div>
        }

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  input: state.input,
  origLat: state.origLat,
  origLong: state.origLong,
  result: state.result,
  selected: state.selected,
  index: state.index,
  directions: state.directions
})

export default connect(mapStateToProps)(App);
