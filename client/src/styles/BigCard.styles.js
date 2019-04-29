import red from '@material-ui/core/colors/red';

export const styles = theme => ({
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
