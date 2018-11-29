import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { DataOtherDimensions } from '../DataDimensions';
import DataDownloadActions from '../DataDownloadActions';
import DataMap from '../DataMap';
import Wrapper from '../Wrapper';
import DataNotes from '../DataNotes';
import { MAP } from '../../api/sdmx';

const style = theme => ({
  wrapper: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const Map = ({ classes, isActive }) => (
  <Wrapper classes={{ root: classes.wrapper }}>
    <Grid container spacing={16}>
      <Grid item xs={12} md={3}>
        <DataOtherDimensions isSide isSelectionExclusive dataType={MAP} />
        <DataDownloadActions dataType={MAP} />
      </Grid>
      <Grid item xs={12} md={9}>
        {isActive && <DataMap />}
      </Grid>
      <Grid item xs={12}>
        <DataNotes />
      </Grid>
    </Grid>
  </Wrapper>
);

Map.propTypes = {
  classes: PropTypes.object.isRequired,
  isActive: PropTypes.bool,
};

export default withStyles(style)(Map);
