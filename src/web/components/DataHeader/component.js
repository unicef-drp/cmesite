import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
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

const DataHeader = ({ classes, title, mode, changeMode, isCompare }) => (
  <CardHeader
    className={classes.header}
    title={
      <React.Fragment>
        <Typography align="center" variant="title" className={classes.typo}>
          {title}
        </Typography>
        {!isCompare && (
          <Grid container justify="center">
            <Grid item>
              <Button size="small" onClick={() => changeMode('chart')} disabled={mode === 'chart'}>
                <FormattedMessage {...messages.chart} />
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                onClick={() => changeMode('estimates')}
                disabled={mode === 'estimates'}
              >
                <FormattedMessage {...messages.estimates} />
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                onClick={() => changeMode('datasources')}
                disabled={mode === 'datasources'}
              >
                <FormattedMessage {...messages.datasources} />
              </Button>
            </Grid>
          </Grid>
        )}
      </React.Fragment>
    }
  />
);

DataHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  mode: PropTypes.string,
  changeMode: PropTypes.func,
  isCompare: PropTypes.bool,
};

export default withStyles(styles)(DataHeader);
