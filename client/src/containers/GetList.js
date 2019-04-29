import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSelection } from '../actions/actions';
import List from '../components/List';

class GetList extends Component {

    constructor(props) {
        super(props);
        this.getInfo = this.getInfo.bind(this);
    }

    getInfo(val) {
        const value = {
          data: this.props.result[val],
          index: val
        }
        this.props.dispatch(updateSelection(value));
    }

    render() {
        return (
            <List
                result={this.props.result}
                getInfo={this.getInfo} />
        )
    }

}

const mapStateToProps = (state) => ({...state})
  
export default (connect(mapStateToProps)(GetList));
