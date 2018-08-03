import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const splashStyle = theme => ({
  wrapper: {
    height: 350,
    paddingLeft: theme.spacing.unit * 12,
    paddingRight: theme.spacing.unit * 12,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
  },
  typo: {
    fontWeight: 'bold',
  },
});

const Splash = ({ title, description, image, classes }) => (
  <div style={{ background: `url("${image}") no-repeat center` }}>
    <Grid container alignItems="center" className={classes.wrapper}>
      <Grid item xs={12} sm={6} md={4}>
        <Typography
          variant="display2"
          color="secondary"
          className={classes.typo}
        >
          {title}
        </Typography>
        <br />
        <Typography variant="body2" color="secondary" className={classes.typo}>
          {description}
        </Typography>
      </Grid>
    </Grid>
  </div>
);

Splash.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  image: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(splashStyle)(Splash);
