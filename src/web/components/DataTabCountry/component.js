import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { CountrySelector } from '../Selector';
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

const DataTabCountry = ({ classes }) => (
  <Grid container spacing={16} className={classes.wrapper}>
    <Grid item xs={12}>
      <CountrySelector />
    </Grid>
    <Grid item xs={12} md={3}>
      <DataOtherDimensions isSide isSelectionExclusive />
      <DataDownloadActions />
    </Grid>
    <Grid item xs={12} md={9}>
      <DataCountryChart />
    </Grid>
  </Grid>
);

DataTabCountry.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(DataTabCountry);
