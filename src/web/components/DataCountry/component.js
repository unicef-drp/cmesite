import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CountrySelector from '../CountrySelector';
import DataDimensions from '../DataDimensions';

const style = theme => ({});

const DataCountry = ({ classes }) => (
  <Grid container>
    <Grid item xs={12}>
      <CountrySelector />
    </Grid>
    <Grid item xs={4}>
      <DataDimensions />
    </Grid>
    <Grid item xs={8}>
      main
    </Grid>
  </Grid>
);

DataCountry.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(DataCountry);
