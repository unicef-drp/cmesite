import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DataDownloadActions from '../DataDownloadActions';
import { DataAllDimensions } from '../DataDimensions';
import Wrapper from '../Wrapper';
import DataNotes from '../DataNotes';

const style = theme => ({
  wrapper: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const DataTabDownload = ({ classes }) => (
  <Wrapper classes={{ root: classes.wrapper }}>
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <DataAllDimensions />
        <DataDownloadActions />
      </Grid>
      <Grid item xs={12}>
        <DataNotes />
      </Grid>
    </Grid>
  </Wrapper>
);

DataTabDownload.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(DataTabDownload);
