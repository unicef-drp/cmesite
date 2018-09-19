import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CountrySelector from '../CountrySelector';
import { DataOtherDimensions } from '../DataDimensions';
import DataDownloadPanel from '../DataDownloadPanel';
import DataTitle from '../DataTitle';
import DataChart from '../DataChart';
import DataLegend from '../DataLegend';

const style = theme => ({
  wrapper: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  content: {
    paddingLeft: theme.spacing.unit * 2, // not RTL
  },
});

const DataCountry = ({ classes }) => (
  <Grid container>
    <Grid item xs={12} className={classes.wrapper}>
      <CountrySelector />
    </Grid>
    <Grid item sm={12} md={3}>
      <DataOtherDimensions isSide />
      <DataDownloadPanel />
    </Grid>
    <Grid item sm={12} md={9} className={classes.content}>
      <DataTitle />
      <DataChart />
      <DataLegend />
    </Grid>
  </Grid>
);

DataCountry.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(DataCountry);
