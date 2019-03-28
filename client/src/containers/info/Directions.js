import React, { Component } from 'react';
import '../../App.css';

class Directions extends Component {

    render() {
        const items = this.props.directions.map((_, i) => 
            <div 
                key={i} 
                dangerouslySetInnerHTML={{ __html: this.props.directions[i] }}
            />
        )
        return (
            <div>
                {items}
            </div>
        )
    }

}

export default Directions;