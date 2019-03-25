import * as R from 'ramda';
import { compose, branch, renderComponent, withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  getCountryTitle,
  getIsLoadingData,
  getCountryEstimateSeries,
  getCountryIncludedSeries,
  getCountryExcludedSeries,
} from '../../selectors/data';
import Estimates from './estimates';
import Datasources from './datasources';
import DataProgress from '../DataProgress';
import DataNone from '../DataNone';

export const DataCountryEstimatesTable = compose(
  connect(
    createStructuredSelector({
      isLoadingData: getIsLoadingData,
      title: getCountryTitle,
      series: getCountryEstimateSeries,
    }),
  ),
  branch(({ isLoadingData }) => isLoadingData, renderComponent(DataProgress)),
  branch(R.pipe(R.prop('series'), R.either(R.isNil, R.isEmpty)), renderComponent(DataNone)),
)(Estimates);

export const DataCountryDataSourcesTable = compose(
  connect(
    createStructuredSelector({
      isLoadingData: getIsLoadingData,
      title: getCountryTitle,
      included: getCountryIncludedSeries,
      excluded: getCountryExcludedSeries,
    }),
  ),
  withProps(({ included, excluded }) => ({ series: R.concat(included, excluded) })),
  branch(({ isLoadingData }) => isLoadingData, renderComponent(DataProgress)),
  branch(R.pipe(R.prop('series'), R.either(R.isNil, R.isEmpty)), renderComponent(DataNone)),
)(Datasources);
