import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { DataOtherDimensions } from '../DataDimensions';
import DataDownloadActions from '../DataDownloadActions';
import DataMap from '../DataMap';
import Wrapper from '../Wrapper';
import DataNote from '../DataNote';
import { MAP } from '../../api/sdmx';

const style = theme => ({
  wrapper: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  noteBar: {
    backgroundColor: theme.palette.secondary.dark,
  },
});

const Map = ({ classes, isActive }) => (
  <React.Fragment>
    <Wrapper classes={{ root: classes.wrapper }}>
      <Grid container spacing={16}>
        <Grid item xs={12} md={3}>
          <DataOtherDimensions isSide isSelectionExclusive dataType={MAP} />
          <DataDownloadActions dataType={MAP} />
        </Grid>
        <Grid item xs={12} md={9}>
          {isActive && <DataMap />}
        </Grid>
      </Grid>
    </Wrapper>
    <div className={classes.noteBar}>
      <Wrapper>
        <DataNote dataType={MAP} />
      </Wrapper>
    </div>
  </React.Fragment>
);

Map.propTypes = {
  classes: PropTypes.object.isRequired,
  isActive: PropTypes.bool,
};

export default withStyles(style)(Map);
