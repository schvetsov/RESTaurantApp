import React, { Component } from 'react';
// import axios from 'axios';
import '../App.css';

class Container extends Component {

  constructor(props) {
    super(props);
    this.state = {
        distance: '',
        instructions: []
    }
    // this.getDirections = this.getDirections.bind(this);
    this.convertMiles = this.convertMiles.bind(this);
  }

  // dispatch3 = (value) => {
  //   this.props.dispatch({ type: "DIRECTIONS", value: value })
  // };

  // getDirections() {
  // let instructions = [];
  //   axios.get('/directions', {
  //     params: {
  //       origLat: this.props.origLat,
  //       origLong: this.props.origLong,
  //       destLat: this.props.latitude[this.props.number],
  //       destLong: this.props.longitude[this.props.number]
  //     }
  //   })
  //   .then(res => {
  //     for (let i=0; i<res.data.directions[0].legs[0].steps.length; i++) {
  //       let data = res.data.directions[0].legs[0].steps[i].html_instructions + '---' + 
  //         res.data.directions[0].legs[0].steps[i].distance.text + '---' + 
  //         res.data.directions[0].legs[0].steps[i].duration.text;
  //       instructions.push(data)
  //     }
  //   })
  //   .then(res => {
  //     this.setState({
  //       instructions: instructions
  //     })
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }

  convertMiles() {
    return Math.round(this.props.distance[this.props.number]*(.000621371)*100)/100
  }

  render() {
    // const items = this.state.instructions.map((_, i) => <div key={i} dangerouslySetInnerHTML={{ __html: this.state.instructions[i] }}/>)
    return (
      <div className="smallCard" onClick={() => this.props.getDirections(this.props.number)}>
        <img className="image" src={this.props.result.image_url} alt="" />
        <div className="smallCard-contents">
          <div className="smallCard-name">{this.props.result.name}</div>
        </div>
      </div>
      // <div className="flex-container-directions">
      //   {items}
      // </div>
    );
  }
}

export default Container;