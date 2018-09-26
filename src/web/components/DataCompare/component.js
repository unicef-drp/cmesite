import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { DataAllDimensions } from '../DataDimensions';
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

const DataCompare = ({ classes, series }) => (
  <Grid container spacing={16} className={classes.wrapper}>
    <Grid item sm={12} md={3}>
      <DataAllDimensions isSide />
      <DataDownloadPanel />
    </Grid>
    <Grid item sm={12} md={9}>
      <DataChart series={series} />
    </Grid>
  </Grid>
);

DataCompare.propTypes = {
  classes: PropTypes.object.isRequired,
  series: PropTypes.object.isRequired,
};

export default withStyles(style)(DataCompare);
