import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CountrySelector from '../CountrySelector';
import DataDimensions from '../DataDimensions';
import DataTitle from '../DataTitle';

const style = theme => ({
  wrapper: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const DataCountry = ({ classes }) => (
  <Grid container>
    <Grid item xs={12} className={classes.wrapper}>
      <CountrySelector />
    </Grid>
    <Grid item xs={4}>
      <DataDimensions />
    </Grid>
    <Grid item xs={8}>
      <DataTitle />
    </Grid>
  </Grid>
);

DataCountry.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(DataCountry);
