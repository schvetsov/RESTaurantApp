import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { styles } from './NavBar.styles';

const NavBar = (props) => (
  <div className={props.classes.root}>
    <AppBar 
      position="static" 
      style={{backgroundColor: "black"}}>
      <Toolbar>
        <IconButton 
          className={props.classes.menuButton} 
          color="inherit" 
          aria-label="Open drawer">
          <MenuIcon />
        </IconButton>
        <Typography 
          className={props.classes.title} 
          variant="h6" 
          color="inherit" 
          noWrap>
          RESTaurant App
        </Typography>
        <div className={props.classes.grow} />
        <div className={props.classes.search}>
          <div className={props.classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder={props.input}
            onChange={props.handleChange}
            classes={{
              root: props.classes.inputRoot,
              input: props.classes.inputInput,
            }} />
        </div>
        <Button 
          variant="contained" 
          className={props.classes.button}
          onClick={() => props.doSearch({...props})} >
          Search
        </Button>
      </Toolbar>
    </AppBar>
  </div>
)

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
