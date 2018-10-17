import { isNil, map, addIndex, prop } from 'ramda';
import { compose, branch, renderNothing, withProps, withHandlers } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  getCountryDimension,
  getCountryValue,
  getIndicatorDimension,
  getIndicatorValue,
} from '../../selectors/data';
import { changeSelection } from '../../ducks/data';
import Component from './component';

export const enhance = (selectors, keys) =>
  compose(
    connect(createStructuredSelector(selectors), {
      changeSelection: changeSelection('select'),
    }),
    branch(({ dimension }) => isNil(dimension), renderNothing),
    withProps(({ dimension }) => ({
      keys,
      values: addIndex(map)(
        ({ id, label }, index) => ({ index, label, value: id }),
        prop('values')(dimension),
      ),
    })),
    withHandlers({
      handleValue: ({ dimension, changeSelection }) => value =>
        changeSelection(dimension.index, value.index),
    }),
  );

export const CountrySelector = enhance(
  {
    dimension: getCountryDimension,
    value: getCountryValue,
  },
  {
    noOptions: 'countrySelectorPlaceholder',
    placeholder: 'countrySelectorNoOption',
  },
)(Component);

export const IndicatorSelector = enhance(
  {
    dimension: getIndicatorDimension,
    value: getIndicatorValue,
  },
  {
    noOptions: 'indicatorSelectorPlaceholder',
    placeholder: 'indicatorSelectorNoOption',
  },
)(Component);
