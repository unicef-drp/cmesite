import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CountrySelector from '../CountrySelector';
import { DataOtherDimensions } from '../DataDimensions';
import DataDownloadActions from '../DataDownloadActions';
import { DataCountryChart } from '../DataChart';

const style = theme => ({
  wrapper: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    marginTop: 0,
    marginBottom: 0,
  },
});

const DataTabCountry = ({ classes, country }) => (
  <Grid container spacing={16} className={classes.wrapper}>
    <Grid item xs={12}>
      <CountrySelector />
    </Grid>
    <Grid item xs={12} md={country ? 4 : 12}>
      <DataOtherDimensions isSide />
      <DataDownloadActions />
    </Grid>
    {country && (
      <Grid item xs={12} md={8}>
        <DataCountryChart />
      </Grid>
    )}
  </Grid>
);

DataTabCountry.propTypes = {
  classes: PropTypes.object.isRequired,
  country: PropTypes.object,
};

export default withStyles(style)(DataTabCountry);
