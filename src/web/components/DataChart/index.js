import { pipe, reject, isNil, isEmpty, either, keys, equals } from 'ramda';
import { compose, branch, renderComponent, withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  getCountryTitle,
  getCompareTitle,
  getIsLoadingData,
  getCountryActiveTypes,
  getSeriesNames,
  getCountryEstimateSeries,
  getCompareEstimateSeries,
  getCountryOtherSeries,
  getCountryIncludedSeries,
  getCountryExcludedSeries,
  getCountryHasHighlights,
  getCompareHasHighlights,
} from '../../selectors/data';
import { toggleActiveType, highlightSerie } from '../../ducks/data';
import Component from './component';
import DataProgress from '../DataProgress';
import DataNone from '../DataNone';
import { ESTIMATE } from '../../constants';
import { COUNTRY, COMPARE } from '../../api/sdmx';

const withData = ({ type, selectors }) =>
  compose(
    connect(
      createStructuredSelector({
        isLoadingData: getIsLoadingData,
        ...selectors,
      }),
      { toggleActiveType, highlightSerie: highlightSerie(type) },
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

export const DataCountryChart = compose(
  withData({
    type: COUNTRY,
    selectors: {
      title: getCountryTitle,
      activeTypes: getCountryActiveTypes,
      estimateSeries: getCountryEstimateSeries,
      uncertaintySeries: getCountryEstimateSeries,
      mergedSeries: getCountryOtherSeries,
      includedSeries: getCountryIncludedSeries,
      excludedSeries: getCountryExcludedSeries,
      hasHighlights: getCountryHasHighlights,
      seriesNames: getSeriesNames,
    },
  }),
  withProps(({ activeTypes }) => ({
    activeTypes: pipe(keys, equals([ESTIMATE]))(activeTypes) ? null : activeTypes,
  })),
)(Component);

export const DataCompareChart = compose(
  withData({
    type: COMPARE,
    selectors: {
      title: getCompareTitle,
      estimateSeries: getCompareEstimateSeries,
      hasHighlights: getCompareHasHighlights,
    },
  }),
  withProps({ isCompare: true }),
)(Component);
