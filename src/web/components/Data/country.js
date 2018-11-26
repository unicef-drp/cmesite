import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { CountrySelector } from '../Selector';
import { DataOtherDimensions } from '../DataDimensions';
import DataDownloadActions from '../DataDownloadActions';
import { DataCountryChart } from '../DataChart';
import Wrapper from '../Wrapper';
import DataNotes from '../DataNotes';
import { COUNTRY } from '../../api/sdmx';

const style = theme => ({
  wrapper: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const Country = ({ classes, isActive }) => (
  <Wrapper classes={{ root: classes.wrapper }}>
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <CountrySelector dataType={COUNTRY} />
      </Grid>
      <Grid item xs={12} md={3}>
        <DataOtherDimensions isSide isSelectionExclusive dataType={COUNTRY} />
        <DataDownloadActions />
      </Grid>
      <Grid item xs={12} md={9}>
        {isActive && <DataCountryChart />}
      </Grid>
      <Grid item xs={12}>
        <DataNotes />
      </Grid>
    </Grid>
  </Wrapper>
);

Country.propTypes = {
  classes: PropTypes.object.isRequired,
  isActive: PropTypes.bool,
};

export default withStyles(style)(Country);
