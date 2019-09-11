import React from 'react';
import PropTypes from 'prop-types';
import { path } from 'ramda';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

const style = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  typo: {
    color: theme.palette.primary.dark,
  },
});

const DataNote = ({ note, classes }) => (
  <Grid container justify="center" className={classes.root}>
    <Grid item xs={12}>
      <Typography align="center" component="p" className={classes.typo}>
        <span dangerouslySetInnerHTML={{ __html: path(['content', 'rendered'])(note) }} />
      </Typography>
    </Grid>
  </Grid>
);

DataNote.propTypes = {
  classes: PropTypes.object.isRequired,
  note: PropTypes.object.isRequired,
};

export default withStyles(style)(DataNote);
