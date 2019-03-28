import * as R from 'ramda';
import { compose, branch, renderComponent } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  getCountryTitle,
  getIsLoadingData,
  getCountryAllEstimateSeries,
  getCountryDatasourcesSerie,
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
      series: getCountryAllEstimateSeries,
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
      serie: getCountryDatasourcesSerie,
    }),
  ),
  branch(({ isLoadingData }) => isLoadingData, renderComponent(DataProgress)),
  branch(R.pipe(R.prop('serie'), R.either(R.isNil, R.isEmpty)), renderComponent(DataNone)),
)(Datasources);
