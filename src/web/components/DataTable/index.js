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
import Loader from '../Loader';

export const DataCountryEstimatesTable = compose(
  connect(
    createStructuredSelector({
      isLoadingData: getIsLoadingData,
      title: getCountryTitle,
      series: getCountryAllEstimateSeries,
    }),
  ),
  branch(({ isLoadingData }) => isLoadingData, renderComponent(Loader)),
)(Estimates);

export const DataCountryDataSourcesTable = compose(
  connect(
    createStructuredSelector({
      isLoadingData: getIsLoadingData,
      title: getCountryTitle,
      serie: getCountryDatasourcesSerie,
    }),
  ),
  branch(({ isLoadingData }) => isLoadingData, renderComponent(Loader)),
)(Datasources);
