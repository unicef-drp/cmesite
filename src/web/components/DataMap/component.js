import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { HomeCountrySelector, IndicatorSelector } from '../Selector';
import WorldMap from '../Map';
import MapSlider from '../MapSlider';
import DataProgress from '../DataProgress';
import { COUNTRY } from '../../api/sdmx';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 4,
  },
  map: {
    marginLeft: theme.spacing.unit * 4,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  title: {
    color: theme.palette.primary.dark,
    borderBottom: `1px solid ${theme.palette.primary.dark}`,
    paddingBottom: theme.spacing.unit,
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
    <div className={classnames({ [classes.map]: !isHome })}>
      {isLoadingData ? (
        <DataProgress />
      ) : (
        <React.Fragment>
          <WorldMap isHome />
          <MapSlider />
        </React.Fragment>
      )}
    </div>
  );

  if (!isHome) return invariant;

  return (
    <Grid container spacing={32} className={classes.root}>
      <Grid item xs={12} sm={7} xl={8} container direction="column" justify="space-between">
        <Typography variant="headline" className={classes.title}>
          <small>
            <FormattedMessage {...messages.title} />
          </small>
        </Typography>
        <div>
          <Typography variant="body2" color="primary" className={classes.indicatorLabel}>
            <FormattedMessage {...messages.indicator} />
          </Typography>
          <IndicatorSelector />
        </div>
      </Grid>
      <Grid item xs={12} sm={5} xl={4}>
        <div className={classes.country}>
          <Typography variant="body2" color="primary" className={classes.countryLabel}>
            <FormattedMessage {...messages.country} />
          </Typography>
          <HomeCountrySelector dataType={COUNTRY} />
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
