import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const styles = theme => ({
  header: {
    //backgroundColor: theme.palette.secondary.dark,
    paddingBottom: 0,
  },
  typo: {
    color: theme.palette.primary.dark,
  },
});

const DataHeader = ({ classes, title, changeMode }) => (
  <CardHeader
    className={classes.header}
    title={
      <React.Fragment>
        <Typography align="center" variant="title" className={classes.typo}>
          {title}
        </Typography>
        <div>
          <Button size="small" onClick={() => changeMode('chart')}>
            <FormattedMessage {...messages.chart} />
          </Button>
          <Button onClick={() => changeMode('estimates')}>
            <FormattedMessage {...messages.estimates} />
          </Button>
          <Button onClick={() => changeMode('datasources')}>
            <FormattedMessage {...messages.datasources} />
          </Button>
        </div>
      </React.Fragment>
    }
  />
);

DataHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  changeMode: PropTypes.func.isRequired,
};

export default withStyles(styles)(DataHeader);
