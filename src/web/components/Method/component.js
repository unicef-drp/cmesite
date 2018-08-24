import React from 'react';
import PropTypes from 'prop-types';
import { path, isNil } from 'ramda';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

const style = theme => ({
  wrapper: {
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit * 12,
    paddingRight: theme.spacing.unit * 12,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
  },
  typo: {
    color: theme.palette.primary.dark,
  },
  image: {
    width: '100%',
  },
});

const Method = ({ method, classes }) => {
  const image = path(['acf', 'image'])(method);
  return (
    <Grid container className={classes.wrapper} justify="center">
      <Grid item xs={12} sm={8}>
        <Typography variant="display1" align="center" className={classes.typo}>
          {path(['title', 'rendered'])(method)}
        </Typography>
        <Typography variant="body2" align="center" paragraph>
          <span
            dangerouslySetInnerHTML={{
              __html: path(['content', 'rendered'])(method),
            }}
          />
        </Typography>
        {isNil(image) ? null : (
          <img className={classes.image} src={image.url} alt={image.alt} />
        )}
      </Grid>
    </Grid>
  );
};

Method.propTypes = {
  method: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(Method);
