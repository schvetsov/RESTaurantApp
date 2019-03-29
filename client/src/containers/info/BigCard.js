import React, { Component } from 'react';
import '../../App.css';
import Directions from './Directions';

class BigCard extends Component {

    convertMiles() {
        return Math.round(this.props.selected.distance*(.000621371)*100)/100
    }
    

    render() {

        const address = this.props.selected.location.display_address.join(", ")

        return (
            <div className="bigCard">
                <div>Name: {this.props.selected.name}</div>
                <div>Phone: {this.props.selected.display_phone}</div>
                <div>Distance: {this.convertMiles()} miles</div>
                <img className="image" src={this.props.selected.image_url} alt="" />
                <div>Rating: {this.props.selected.rating}</div>
                <div>Review Count: {this.props.selected.review_count}</div>
                <div>Address: {address}</div>
                <div>Type: {this.props.selected.categories[0].title}</div>
                <button onClick={() => this.props.getDirections(this.props.selected.coordinates)}>Directions</button>
                
                {this.props.directions[this.props.index].length !== 0 ?
                    <Directions 
                        selected={this.props.selected}
                        index={this.props.index}
                        directions={this.props.directions}
                    />
                :
                    <div></div>
                }

            </div>
        )
    }

}

export default BigCard;