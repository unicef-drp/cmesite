import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { DataAllDimensions } from '../DataDimensions';
import DataDownloadActions from '../DataDownloadActions';
import { DataCompareChart } from '../DataChart';
import Wrapper from '../Wrapper';
import DataNote from '../DataNote';
import { COMPARE } from '../../api/sdmx';

const style = theme => ({
  wrapper: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const Compare = ({ classes, isActive }) => (
  <React.Fragment>
    <Wrapper classes={{ root: classes.wrapper }}>
      <Grid container spacing={16}>
        <Grid item xs={12} md={3}>
          <DataAllDimensions isSide dataType={COMPARE} />
          <DataDownloadActions dataType={COMPARE} />
        </Grid>
        <Grid item xs={12} md={9}>
          {isActive && <DataCompareChart />}
        </Grid>
      </Grid>
    </Wrapper>
    <DataNote dataType={COMPARE} />
  </React.Fragment>
);

Compare.propTypes = {
  classes: PropTypes.object.isRequired,
  isActive: PropTypes.bool,
};

export default withStyles(style)(Compare);
