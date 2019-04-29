import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { styles } from '../styles/List.styles';

const List = (props) => (   
    <GridList cellHeight={190} className={props.classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
        </GridListTile>
        {props.result.map((_,i) => (
            <GridListTile key={i} onClick={() => props.getInfo(i)}>
                <img src={props.result[i].image_url} alt={""} />
                <GridListTileBar
                    title={props.result[i].name} 
                    subtitle={props.result[i].categories[0].title}
                    actionIcon={
                        <IconButton className={props.classes.icon}>
                            <InfoIcon />
                        </IconButton>
                    } />
            </GridListTile>
        ))}
    </GridList>
)

List.propTypes = {
  classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(List);
