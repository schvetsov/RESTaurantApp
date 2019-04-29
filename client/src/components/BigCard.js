import React from 'react';
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
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { styles } from '../styles/BigCard.styles';

const BigCard = (props) => (   
  <Card className={props.classes.card}>
    <CardMedia
      className={props.classes.media}
      image={props.selected.image_url} />
      <CardHeader
        avatar={
        <Avatar aria-label="Recipe" className={props.classes.avatar}>
          {props.selected.name[0]}
        </Avatar>
      }
      action={
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      }
      title={props.selected.name}
      subheader={props.selected.categories[0].title} />
    <CardContent>
      <Typography component="p">
        <span>Phone: {props.selected.display_phone}</span><br/>
        <span>Distance: {props.convertMiles} miles</span><br/>
        <span>Rating: {props.selected.rating}</span><br/>
        <span>Review Count: {props.selected.review_count}</span><br/>
        <span>Address: {props.address}</span><br/>
      </Typography>
    </CardContent>
    <CardActions className={props.classes.actions} disableActionSpacing>
      <IconButton aria-label="Add to favorites">
        <FavoriteIcon />
      </IconButton>
      <IconButton aria-label="Share">
        <ShareIcon />
      </IconButton>
      <IconButton
        className={classnames(props.classes.expand, {
          [props.classes.expandOpen]: props.expanded,
        })}
        onClick={props.handleExpandClick}
        aria-expanded={props.expanded}
        aria-label="Show more" >
        <ExpandMoreIcon />
      </IconButton>
    </CardActions>
    <Collapse in={props.expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <Typography paragraph>
          <Directions 
            selected={props.selected}
            index={props.index}
            directions={props.directions} />
        </Typography>
      </CardContent>
    </Collapse>
  </Card>
)

BigCard.propTypes = {
  classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(BigCard);
