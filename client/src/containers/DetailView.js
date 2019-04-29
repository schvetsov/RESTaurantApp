import React, { Component } from 'react';
import BigCard from '../components/BigCard';
import { connect } from 'react-redux';
import { expandDirections } from '../actions/actions';
import { getDirections } from '../logic/api';

class DetailView extends Component {

    constructor(props) {
        super(props);
        this.handleExpandClick = this.handleExpandClick.bind(this);
        this.convertMiles = this.convertMiles.bind(this);
        this.getDirections = getDirections;
    }

    handleExpandClick = () => {
        console.log('clicked')
        this.props.dispatch(expandDirections(!this.props.expanded));
        this.getDirections({...this.props});
    };

    convertMiles() {
        return Math.round(this.props.selected.distance*(.000621371)*100)/100
    }

    render() {
        return (
            <>
                {this.props.selected ?
                    <BigCard 
                        {...this.props}
                        getDirections={this.getDirections}
                        address={this.props.selected.location.display_address.join(", ")}
                        convertMiles={this.props.convertMiles} 
                        handleExpandClick={this.handleExpandClick} />
                :
                    <div></div>
                }
            </>
        )
    }

}

const mapStateToProps = (state) => ({...state})
  
export default (connect(mapStateToProps)(DetailView));
