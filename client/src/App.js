import React, { Component } from 'react';
import BigCard from './containers/info/BigCard';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { doSearch, getDirections } from './logic/api';
import { styles } from './App.styles';

import { changeInput, 
         getCoordinates, 
         updateSelection } from './actions/actions';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.doSearch = doSearch;
    this.getDirections = getDirections;
  }

  //Update state for text input
  handleChange(event) {
    this.props.dispatch(changeInput(event.target.value));
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
      this.props.dispatch(getCoordinates(value));
    })
    .catch((err) => {
      console.error(err.message);
    });
  }

  getInfo(val) {
    const value = {
      data: this.props.result[val],
      index: val
    }
    this.props.dispatch(updateSelection(value));
  }

  render() {

    const { classes } = this.props;
    const items = this.props.result.map((_,i) => (
      <GridListTile key={i} onClick={() => this.getInfo(i)}>
        <img src={this.props.result[i].image_url} alt={""} />
        <GridListTileBar
          title={this.props.result[i].name} 
          subtitle={this.props.result[i].categories[0].title}
          actionIcon={
            <IconButton className={classes.icon}>
              <InfoIcon />
            </IconButton>
          }
        />
      </GridListTile>
    ))

    return ( 
      <div>
        <div className={classes.root}>
          <AppBar position="static" style={{backgroundColor: "black"}}>
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                <MenuIcon />
              </IconButton>
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                RESTaurant App
              </Typography>
              <div className={classes.grow} />
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder={this.props.input}
                  onChange={this.handleChange}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
              <Button 
                variant="contained" 
                className={classes.button}
                onClick={() => this.doSearch({...this.props})}
              >
                Search
              </Button>
            </Toolbar>
          </AppBar>
        </div>

        <div className={classes.root1}>
          <GridList cellHeight={190} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            </GridListTile>
            {items}
          </GridList>
        

        {this.props.selected ?
          <BigCard 
            selected={this.props.selected}
            index={this.props.index}
            getDirections={this.getDirections}
            directions={this.props.directions}
            origLat={this.props.origLat}
            origLong={this.props.origLong}
            dispatch={this.props.dispatch}
          />
        :
          <div></div>
        }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({...state})

export default withStyles(styles)(connect(mapStateToProps)(App));
