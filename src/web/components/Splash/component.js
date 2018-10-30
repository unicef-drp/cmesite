import React from 'react';
import PropTypes from 'prop-types';
import { path } from 'ramda';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const style = theme => ({
  wrapper: {
    height: 350,
    paddingLeft: theme.spacing.unit * 12,
    paddingRight: theme.spacing.unit * 12,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
  },
});

const Splash = ({ splash, classes, theme }) => (
  <div
    style={{
      background: `${theme.palette.primary.main} url("${path([
        'acf',
        'image',
        'url',
      ])(splash)}") repeat center`,
      backgroundSize: 'cover',
    }}
  >
    <Grid container alignItems="center" className={classes.wrapper}>
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="display1" color="secondary" paragraph>
          {path(['title', 'rendered'])(splash)}
        </Typography>
        <Typography variant="body2" color="secondary">
          <span
            dangerouslySetInnerHTML={{
              __html: path(['content', 'rendered'])(splash),
            }}
          />
        </Typography>
      </Grid>
    </Grid>
  </div>
);

Splash.propTypes = {
  splash: PropTypes.object,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(style, { withTheme: true })(Splash);
