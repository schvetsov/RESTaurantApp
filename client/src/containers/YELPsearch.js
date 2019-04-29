import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doSearch, getDirections } from '../logic/api';
import NavBar from '../components/NavBar';
import { changeInput, getCoordinates } from '../actions/actions';

class YELPsearch extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.doSearch = doSearch;
    this.getDirections = getDirections;
  }

  handleChange(event) {
    this.props.dispatch(changeInput(event.target.value));
  }

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
        this.props.dispatch(getCoordinates(value));
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  render() {
    return ( 
      <NavBar
        {...this.props}
        doSearch={this.doSearch}
        handleChange={this.handleChange} />
    );
  }
}

const mapStateToProps = (state) => ({...state})

export default (connect(mapStateToProps)(YELPsearch));
