import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import YELPsearch from '../containers/YELPsearch';
import DetailView from '../containers/DetailView';
import GetList from '../containers/GetList';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  }
});

const App = (props) => (
  <>
    <YELPsearch data-test='this-list' />
    <div className={props.classes.root}>
      <GetList />
      <DetailView />
    </div>
  </>
)

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
