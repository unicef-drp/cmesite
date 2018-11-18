import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { DataAllDimensions } from '../DataDimensions';
import DataDownloadActions from '../DataDownloadActions';
import { DataCompareChart } from '../DataChart';
import Wrapper from '../Wrapper';

const style = theme => ({
  wrapper: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const DataTabCompare = ({ classes }) => (
  <Wrapper classes={{ root: classes.wrapper }}>
    <Grid container spacing={16}>
      <Grid item xs={12} md={3}>
        <DataAllDimensions isSide />
        <DataDownloadActions />
      </Grid>
      <Grid item xs={12} md={9}>
        <DataCompareChart isCompare />
      </Grid>
    </Grid>
  </Wrapper>
);

DataTabCompare.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(DataTabCompare);
