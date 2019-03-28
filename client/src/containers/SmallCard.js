import React, { Component } from 'react';
import '../App.css';

class Container extends Component {

  render() {
    return (
      <div className="smallCard" onClick={() => this.props.getInfo(this.props.number)}>
        <div className="smallCard-contents">
          <div className="smallCard-name">{this.props.result.name}</div>
        </div>
      </div>
    );
  }
}

export default Container;