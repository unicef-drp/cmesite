import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { DataOtherDimensions } from '../DataDimensions';
import DataDownloadActions from '../DataDownloadActions';
import DataMap from '../DataMap';

const style = theme => ({
  wrapper: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    marginTop: 0,
    marginBottom: 0,
  },
});

const DataTabMap = ({ classes }) => (
  <Grid container spacing={16} className={classes.wrapper}>
    <Grid item xs={12} md={4}>
      <DataOtherDimensions isSide />
      <DataDownloadActions />
    </Grid>
    <Grid item xs={12} md={8}>
      <DataMap />
    </Grid>
  </Grid>
);

DataTabMap.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(DataTabMap);
