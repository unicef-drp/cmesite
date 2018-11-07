import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { HomeCountrySelector, IndicatorSelector } from '../Selector';
import WorldMap from '../Map';
import DataProgress from '../DataProgress';

const styles = theme => ({
  title: {
    color: theme.palette.primary.dark,
    borderBottom: `1px solid ${theme.palette.primary.dark}`,
    marginBottom: theme.spacing.unit,
  },
  country: {
    background: theme.palette.primary.light,
    padding: theme.spacing.unit * 3,
  },
  countryLabel: {
    fontWeight: 600,
  },
  indicatorLabel: {
    color: theme.palette.primary.dark,
    fontWeight: 600,
  },
});

const Component = ({ classes, isHome, isLoadingData }) => {
  const invariant = (
    <React.Fragment>
      {isLoadingData ? (
        <DataProgress />
      ) : (
        <React.Fragment>
          <WorldMap />
          <p>slider</p>
          <p>legend</p>
        </React.Fragment>
      )}
    </React.Fragment>
  );

  if (!isHome) return invariant;

  return (
    <Grid container spacing={16}>
      <Grid item xs={12} lg={8} container direction="column" justify="space-between">
        <Typography variant="headline" className={classes.title}>
          <FormattedMessage {...messages.title} />&nbsp;
          <small>
            <FormattedMessage {...messages.subtitle} />
          </small>
        </Typography>
        <div>
          <Typography variant="body2" color="primary" className={classes.indicatorLabel}>
            <FormattedMessage {...messages.indicator} />
          </Typography>
          <IndicatorSelector />
        </div>
      </Grid>
      <Grid item xs={12} lg={4}>
        <div className={classes.country}>
          <Typography variant="body2" color="primary" className={classes.countryLabel}>
            <FormattedMessage {...messages.country} />
          </Typography>
          <HomeCountrySelector />
        </div>
      </Grid>
      <Grid item xs={12}>
        {invariant}
      </Grid>
    </Grid>
  );
};

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  isHome: PropTypes.bool,
  isLoadingData: PropTypes.bool,
};

export default withStyles(styles)(Component);
