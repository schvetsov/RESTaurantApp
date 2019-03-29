import React, { Component } from 'react';
import '../../App.css';

class Directions extends Component {

    render() {

        const items = this.props.directions[this.props.index].map((_, i) => 
            <div 
                key={i} 
                dangerouslySetInnerHTML = {{ 
                    __html: this.props.directions[this.props.index][i] 
                }}
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