import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { DataAllDimensions } from '../DataDimensions';
import DataDownloadActions from '../DataDownloadActions';
import { DataCompareChart } from '../DataChart';

const style = theme => ({
  wrapper: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    marginTop: 0,
    marginBottom: 0,
  },
});

const DataTabCompare = ({ classes }) => (
  <Grid container spacing={16} className={classes.wrapper}>
    <Grid item xs={12} md={3}>
      <DataAllDimensions isSide />
      <DataDownloadActions />
    </Grid>
    <Grid item xs={12} md={9}>
      <DataCompareChart isCompare />
    </Grid>
  </Grid>
);

DataTabCompare.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(DataTabCompare);
