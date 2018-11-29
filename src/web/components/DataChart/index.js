import { pipe, reject, isNil, isEmpty, either } from 'ramda';
import { compose, branch, renderComponent, withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  getTitle,
  getIsLoadingData,
  getActiveTypes,
  getCountryEstimateSeries,
  getCountryIncludedSeries,
  getCountryExcludedSeries,
  getCompareEstimateSeries,
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
        pipe(reject(either(isNil, isEmpty)), isEmpty)([
          estimateSeries,
          includedSeries,
          excludedSeries,
        ]),
      renderComponent(DataNone),
    ),
  );

export const DataCountryChart = withData({
  activeTypes: getActiveTypes,
  estimateSeries: getCountryEstimateSeries,
  uncertaintySeries: getCountryEstimateSeries,
  includedSeries: getCountryIncludedSeries,
  excludedSeries: getCountryExcludedSeries,
})(Component);

export const DataCompareChart = compose(
  withData({ estimateSeries: getCompareEstimateSeries }),
  withProps({ isCompare: true }),
)(Component);
