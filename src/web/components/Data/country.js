import React from 'react';
import PropTypes from 'prop-types';
import { compose, withStateHandlers } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { CountrySelector } from '../Selector';
import { DataOtherDimensions } from '../DataDimensions';
import DataDownloadActions from '../DataDownloadActions';
import { DataCountryChart } from '../DataChart';
import { DataCountryEstimatesTable, DataCountryDataSourcesTable } from '../DataTable';
import Wrapper from '../Wrapper';
import DataNote from '../DataNote';
import { COUNTRY } from '../../api/sdmx';

const style = theme => ({
  wrapper: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const Country = ({ classes, isActive, mode, changeMode }) => (
  <React.Fragment>
    <Wrapper classes={{ root: classes.wrapper }}>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <CountrySelector dataType={COUNTRY} />
        </Grid>
        <Grid item xs={12} md={3}>
          <DataOtherDimensions isSide isSelectionExclusive dataType={COUNTRY} />
          <DataDownloadActions dataType={COUNTRY} />
        </Grid>
        <Grid item xs={12} md={9}>
          {isActive && mode === 'chart' ? (
            <DataCountryChart changeMode={changeMode} mode={mode} />
          ) : mode === 'estimates' ? (
            <DataCountryEstimatesTable changeMode={changeMode} mode={mode} />
          ) : (
            <DataCountryDataSourcesTable changeMode={changeMode} mode={mode} />
          )}
        </Grid>
      </Grid>
    </Wrapper>
    {mode === 'chart' && <DataNote dataType={COUNTRY} />}
  </React.Fragment>
);

Country.propTypes = {
  classes: PropTypes.object.isRequired,
  isActive: PropTypes.bool,
  mode: PropTypes.string,
  changeMode: PropTypes.func.isRequired,
};

export default compose(
  withStateHandlers({ mode: 'chart' }, { changeMode: () => mode => ({ mode }) }),
  withStyles(style),
)(Country);
