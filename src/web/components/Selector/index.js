import { isNil, map, addIndex, prop, propEq, filter, not, equals, over, lensProp } from 'ramda';
import { compose, branch, renderNothing, withProps, withHandlers } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import routes, { getPath } from '../../routes';
import {
  getCountryDimension,
  getCountryValue,
  getIndicatorDimension,
  getIndicatorValue,
} from '../../selectors/data';
import { changeSelection, changeActiveTab } from '../../ducks/data';
import Component from './component';
import { HOME } from '../../api/sdmx';

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
    withProps(({ dimension, dataType }) => {
      // death indicator values are irrelevant in map
      if (not(equals(dataType, HOME))) return {};
      return { dimension: over(lensProp('values'), filter(propEq('isRate', true)), dimension) };
    }),
    withProps(({ dimension }) => ({
      keys,
      isCountry,
      values: addIndex(map)(
        ({ id, label }, index) => ({ index, label, value: id }),
        prop('values')(dimension),
      ),
    })),
    withHandlers({
      handleValue: ({ dimension, changeSelection, history, changeActiveTab }) => value => {
        if (isCountry) {
          changeActiveTab(0);
          history.push(getPath(routes.data));
        }
        changeSelection(dimension.index, value.index);
      },
    }),
  );

export const CountrySelector = enhance(
  { dimension: getCountryDimension, value: getCountryValue },
  { noOptions: 'countrySelectorPlaceholder', placeholder: 'countrySelectorNoOption' },
  { isCountry: true },
)(Component);

export const HomeCountrySelector = enhance(
  { dimension: getCountryDimension },
  { noOptions: 'countrySelectorPlaceholder', placeholder: 'countrySelectorHome' },
  { isCountry: true },
)(Component);

export const IndicatorSelector = enhance(
  { dimension: getIndicatorDimension, value: getIndicatorValue },
  { noOptions: 'indicatorSelectorPlaceholder', placeholder: 'indicatorSelectorNoOption' },
)(Component);
