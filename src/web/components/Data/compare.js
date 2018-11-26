import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { DataAllDimensions } from '../DataDimensions';
import DataDownloadActions from '../DataDownloadActions';
import { DataCompareChart } from '../DataChart';
import Wrapper from '../Wrapper';
import DataNotes from '../DataNotes';
import { COMPARE } from '../../api/sdmx';

const style = theme => ({
  wrapper: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const Compare = ({ classes, isActive }) => (
  <Wrapper classes={{ root: classes.wrapper }}>
    <Grid container spacing={16}>
      <Grid item xs={12} md={3}>
        <DataAllDimensions isSide dataType={COMPARE} />
        <DataDownloadActions />
      </Grid>
      <Grid item xs={12} md={9}>
        {isActive && <DataCompareChart />}
      </Grid>
      <Grid item xs={12}>
        <DataNotes />
      </Grid>
    </Grid>
  </Wrapper>
);

Compare.propTypes = {
  classes: PropTypes.object.isRequired,
  isActive: PropTypes.bool,
};

export default withStyles(style)(Compare);
