import React from 'react';
import PropTypes from 'prop-types';
import { path } from 'ramda';
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

const DataNote = ({ note, classes }) => (
  <Wrapper classes={{ root: classes.wrapper }}>
    <Typography align="center" component="p" className={classes.typo}>
      <span
        dangerouslySetInnerHTML={{
          __html: path(['content', 'rendered'])(note),
        }}
      />
    </Typography>
  </Wrapper>
);

DataNote.propTypes = {
  classes: PropTypes.object.isRequired,
  note: PropTypes.object.isRequired,
};

export default withStyles(style)(DataNote);
