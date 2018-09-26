import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CountrySelector from '../CountrySelector';
import { DataOtherDimensions } from '../DataDimensions';
import DataDownloadPanel from '../DataDownloadPanel';
import DataChart from '../DataChart';

const style = theme => ({
  wrapper: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    marginTop: 0,
    marginBottom: 0,
  },
});

const DataCountry = ({ classes, series, estimates, country }) => (
  <Grid container spacing={16} className={classes.wrapper}>
    <Grid item xs={12}>
      <CountrySelector />
    </Grid>
    <Grid item sm={12} md={3}>
      <DataOtherDimensions isSide />
      <DataDownloadPanel />
    </Grid>
    <Grid item sm={12} md={9}>
      {country && <DataChart series={series} estimates={estimates} />}
    </Grid>
  </Grid>
);

DataCountry.propTypes = {
  classes: PropTypes.object.isRequired,
  series: PropTypes.object.isRequired,
  estimates: PropTypes.object.isRequired,
  country: PropTypes.object,
};

export default withStyles(style)(DataCountry);
