import { yelpSearch, 
         updateDirections } from '../actions/actions';
import axios from 'axios';

export function doSearch(passedProps) {
  axios.get('/yelp/yelp', {
    params: {
      input: passedProps.input,
      origLat: passedProps.origLat,
      origLong: passedProps.origLong
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
    passedProps.dispatch(yelpSearch(value));
    console.log(passedProps.result);
  })
  .catch(err => console.log(err))
}

export function getDirections(passedProps) {
    //If we already have directions, then abort
    if(passedProps.directions[passedProps.index].length !== 0){
      console.log("GET aborted");
      return;
    }
    console.log(passedProps);
    let directions = passedProps.directions;
    
    axios.get('/directions/directions', {
      params: {
        origLat: passedProps.origLat,
        origLong: passedProps.origLong,
        destLat: passedProps.selected.coordinates.latitude,
        destLong: passedProps.selected.coordinates.longitude
      }
    })
    .then(res => {
      let result = res.data.directions[0].legs[0];
      for (let i = 0; i < result.steps.length; i++) {
        let data = result.steps[i].html_instructions + '---' + 
          result.steps[i].distance.text + '---' + 
          result.steps[i].duration.text;
        directions[passedProps.index].push(data)
      }
      const value = {
        directions: directions,
        index: passedProps.index
      }
      passedProps.dispatch(updateDirections(value));
      console.log("GET request to Google accomplished");
    })
    .catch(err => {
      console.log(err)
    })
  }
