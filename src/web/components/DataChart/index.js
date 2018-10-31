import { pipe, reject, isNil, isEmpty } from 'ramda';
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
import DataNone from '../DataNone';

const withData = selectors =>
  compose(
    connect(
      createStructuredSelector({
        title: getTitle,
        isLoadingData: getIsLoadingData,
        ...selectors,
      }),
      { toggleActiveType },
    ),
    branch(({ isLoadingData }) => isLoadingData, renderComponent(DataProgress)),
    branch(
      ({ estimateSeries, includedSeries, excludedSeries }) =>
        pipe(reject(isNil), isEmpty)([
          estimateSeries,
          includedSeries,
          excludedSeries,
        ]),
      renderComponent(DataNone),
    ),
  );

export const DataCountryChart = withData({
  activeTypes: getActiveTypes,
  estimateSeries: getDataEstimateSeries,
  uncertaintySeries: getDataEstimateSeries,
  includedSeries: getDataIncludedSeries,
  excludedSeries: getDataExcludedSeries,
})(Component);

export const DataCompareChart = withData({
  estimateSeries: getDataEstimateSeries,
})(Component);
