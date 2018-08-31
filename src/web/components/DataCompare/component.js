import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { DataAllDimensions } from '../DataDimensions';
import DataDownloadPanel from '../DataDownloadPanel';
import DataChart from '../DataChart';

const style = theme => ({
  wrapper: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const DataCompare = ({ classes }) => (
  <Grid container className={classes.wrapper}>
    <Grid item xs={3}>
      <DataAllDimensions />
      <DataDownloadPanel />
    </Grid>
    <Grid item xs={9}>
      <DataChart />
    </Grid>
  </Grid>
);

DataCompare.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(DataCompare);
