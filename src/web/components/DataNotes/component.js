import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Wrapper from '../Wrapper';

const style = theme => ({
  wrapper: {
    backgroundColor: theme.palette.secondary.dark,
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
  },
  typo: {
    color: theme.palette.primary.dark,
  },
});

const DataNotes = ({ notes, classes }) => (
  <Wrapper classes={{ root: classes.wrapper }}>
    <Typography align="center" component="p" className={classes.typo}>
      {notes}
    </Typography>
  </Wrapper>
);

DataNotes.propTypes = {
  classes: PropTypes.object.isRequired,
  notes: PropTypes.string,
};

export default withStyles(style)(DataNotes);
