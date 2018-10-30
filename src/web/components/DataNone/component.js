import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const style = theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing.unit * 8,
  },
});

const DataNone = ({ classes }) => (
  <div className={classes.wrapper}>
    <Typography variant="title" color="primary">
      <FormattedMessage {...messages.title} />
    </Typography>
  </div>
);

DataNone.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(DataNone);
