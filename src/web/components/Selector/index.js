import { isNil, prop } from 'ramda';
import { compose, branch, renderNothing, withProps, withHandlers } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import {
  getCountryDimensionWithAggregates,
  getCountryValue,
  getMapIndicatorDimension,
  getMapIndicatorValue,
} from '../../selectors/data';
import { changeSelection, changeActiveTab } from '../../ducks/data';
import Component from './component';

export const enhance = (selectors, keys, { isCountry } = {}) =>
  compose(
    withRouter,
    connect(createStructuredSelector(selectors), (dispatch, { dataType }) =>
      bindActionCreators(
        {
          changeSelection: changeSelection({ dataType, selectionType: 'select' }),
          changeActiveTab,
        },
        dispatch,
      ),
    ),
    branch(({ dimension }) => isNil(dimension), renderNothing),
    withProps(({ dimension }) => ({
      keys,
      isCountry,
      values: prop('values')(dimension),
    })),
    withHandlers({
      handleValue: ({ dimension, changeSelection, history, changeActiveTab }) => value => {
        if (isCountry) {
          changeActiveTab(0, true);
          history.push(`/data/${value.label}`);
        }
        changeSelection(dimension.index, value.index);
      },
    }),
  );

export const CountrySelector = enhance(
  { dimension: getCountryDimensionWithAggregates(), value: getCountryValue },
  { noOptions: 'countrySelectorPlaceholder', placeholder: 'countrySelectorPlaceholder' },
  { isCountry: true },
)(Component);

export const HomeCountrySelector = enhance(
  { dimension: getCountryDimensionWithAggregates() },
  { noOptions: 'countrySelectorPlaceholder', placeholder: 'countrySelectorPlaceholder' },
  { isCountry: true },
)(Component);

export const HomeIndicatorSelector = enhance(
  { dimension: getMapIndicatorDimension, value: getMapIndicatorValue },
  { noOptions: 'indicatorSelectorPlaceholder', placeholder: 'indicatorSelectorNoOption' },
)(Component);
