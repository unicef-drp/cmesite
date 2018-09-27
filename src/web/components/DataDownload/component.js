import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DataDownloadBar from '../DataDownloadBar';
import DataDownloadDimensions from '../DataDownloadDimensions';

const style = theme => ({
  wrapper: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const DataDownload = ({ classes }) => (
  <Grid container className={classes.wrapper}>
    <DataDownloadBar />
    <DataDownloadDimensions />
    <DataDownloadBar />
  </Grid>
);

DataDownload.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(DataDownload);
