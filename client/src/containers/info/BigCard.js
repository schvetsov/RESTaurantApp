import React, { Component } from 'react';
import '../../App.css';
import Directions from './Directions';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
    card: {
      maxWidth: '50%',
      padding: 10
    },
    media: {
      height: 0,
      paddingTop: '66.25%', // 16:9
      width: 500,
      margin: 'auto'
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  });

class BigCard extends Component {

    state = { expanded: false };

    handleExpandClick = () => {
      this.setState(state => ({ expanded: !state.expanded }), this.props.getDirections({...this.props}));
    };

    convertMiles() {
        return Math.round(this.props.selected.distance*(.000621371)*100)/100
    }
    

    render() {

        const { classes } = this.props;
        const address = this.props.selected.location.display_address.join(", ")

        return (
            <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={this.props.selected.image_url}
            //   title="Paella dish"
            />
                        <CardHeader
              avatar={
                <Avatar aria-label="Recipe" className={classes.avatar}>
                  {this.props.selected.name[0]}
                </Avatar>
              }
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              title={this.props.selected.name}
              subheader={this.props.selected.categories[0].title}
            />
            <CardContent>
              <Typography component="p">
                <span>Phone: {this.props.selected.display_phone}</span><br/>
                <span>Distance: {this.convertMiles()} miles</span><br/>
                <span>Rating: {this.props.selected.rating}</span><br/>
                <span>Review Count: {this.props.selected.review_count}</span><br/>
                <span>Address: {address}</span><br/>
              </Typography>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
              <IconButton aria-label="Add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="Share">
                <ShareIcon />
              </IconButton>
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded,
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>
                     <Directions 
                         selected={this.props.selected}
                         index={this.props.index}
                         directions={this.props.directions}
                     />
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        )
    }

}

BigCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(BigCard);