import { compose, branch, renderComponent } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  getTitle,
  getIsLoadingData,
  getActiveTypes,
  getDataEstimateSeries,
  getDataIncludedSeries,
  getDataExcludedSeries,
} from '../../selectors/data';
import { toggleActiveType } from '../../ducks/data';
import Component from './component';
import DataProgress from '../DataProgress';

const withData = selectors =>
  compose(
    connect(
      createStructuredSelector({
        title: getTitle,
        isLoadingData: getIsLoadingData,
        activeTypes: getActiveTypes,
        ...selectors,
      }),
      { toggleActiveType },
    ),
    branch(({ isLoadingData }) => isLoadingData, renderComponent(DataProgress)),
  );

export const DataCountryChart = withData({
  estimateSeries: getDataEstimateSeries,
  uncertaintySeries: getDataEstimateSeries,
  includedSeries: getDataIncludedSeries,
  excludedSeries: getDataExcludedSeries,
})(Component);

export const DataCompareChart = withData({
  estimateSeries: getDataEstimateSeries,
})(Component);
