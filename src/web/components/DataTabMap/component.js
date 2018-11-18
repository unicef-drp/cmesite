import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { DataOtherDimensions } from '../DataDimensions';
import DataDownloadActions from '../DataDownloadActions';
import DataMap from '../DataMap';
import Wrapper from '../Wrapper';

const style = theme => ({
  wrapper: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const DataTabMap = ({ classes }) => (
  <Wrapper classes={{ root: classes.wrapper }}>
    <Grid container spacing={16}>
      <Grid item xs={12} md={3}>
        <DataOtherDimensions isSide isSelectionExclusive />
        <DataDownloadActions />
      </Grid>
      <Grid item xs={12} md={9}>
        <DataMap />
      </Grid>
    </Grid>
  </Wrapper>
);

DataTabMap.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(DataTabMap);
