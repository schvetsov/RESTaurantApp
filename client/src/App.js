import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SmallCard from './containers/SmallCard';
import BigCard from './containers/info/BigCard';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root1: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    //width: 400
  },
  gridList: {
    width: 500,
    height: '100vh'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },

  button: {
    margin: theme.spacing.unit
  },


  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },


});


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.doSearch = this.doSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getDirections = this.getDirections.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.getDirections = this.getDirections.bind(this);
  }

  dispatch = (value) => {
    this.props.dispatch({ type: "CHANGEINPUT", value: value })
  };

  dispatch1 = (value) => {
    this.props.dispatch({ type: "GEOLOCATION", value: value })
  };

  dispatch2 = (value) => {
    this.props.dispatch({ type: "YELPRESPONSE", value: value })
  };

  dispatch3 = (value) => {
    this.props.dispatch({ type: "DIRECTIONS", value: value })
  };

  dispatch4 = (value) => {
    this.props.dispatch({ type: "SELECTED", value: value })
  };

  //Update state for text input
  handleChange(event) {
    this.dispatch(event.target.value)
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
      this.dispatch1(value)
    })
    .catch((err) => {
      console.error(err.message);
    });
  }

  //Do the search on Yelp
  doSearch() {
    axios.get('/yelp/yelp', {
      params: {
        input: this.props.input,
        origLat: this.props.origLat,
        origLong: this.props.origLong
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
      this.dispatch2(value);
      console.log(this.props.result);
    })
    .catch(err => console.log(err))

  }

  getInfo(val) {
    const value = {
      data: this.props.result[val],
      index: val
    }
    this.dispatch4(value)
  }

  //Get directions from Google Directions API
  getDirections(value) {

    //If we already have directions, then abort
    if(this.props.directions[this.props.index].length !== 0){
      console.log("GET aborted");
      return;
    }

    let directions = this.props.directions;
    
    axios.get('/directions/directions', {
      params: {
        origLat: this.props.origLat,
        origLong: this.props.origLong,
        destLat: value.latitude,
        destLong: value.longitude
      }
    })
    .then(res => {
      let result = res.data.directions[0].legs[0];
      for (let i = 0; i < result.steps.length; i++) {
        let data = result.steps[i].html_instructions + '---' + 
          result.steps[i].distance.text + '---' + 
          result.steps[i].duration.text;
        directions[this.props.index].push(data)
      }
      const value = {
        directions: directions,
        index: this.props.index
      }
      this.dispatch3(value)
      console.log("GET request to Google accomplished");
    })
    .catch(err => {
      console.log(err)
    })
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
                onClick={this.doSearch}
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

const mapStateToProps = (state) => ({
  input: state.input,
  origLat: state.origLat,
  origLong: state.origLong,
  result: state.result,
  selected: state.selected,
  index: state.index,
  directions: state.directions
})

export default withStyles(styles)(connect(mapStateToProps)(App));
