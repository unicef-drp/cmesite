import { isNil, isEmpty, anyPass, not, propEq, map, lensProp, over, equals, filter } from 'ramda';
import { compose, branch, renderNothing, withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getDimensionsWithAggregates,
  getOtherDimensions,
  getIsExcNoSexIndicatorValue,
  getActiveTab,
} from '../../selectors/data';
import { changeSelection } from '../../ducks/data';
import Component from './component';
import { SEX, SEX_TOTAL_VALUE, INDICATOR } from '../../constants';

const withDimensions = selector =>
  compose(
    connect(
      createStructuredSelector({
        dimensions: selector,
        isExcNoSexIndicatorValue: getIsExcNoSexIndicatorValue,
        activeTab: getActiveTab,
      }),
      (dispatch, { isSelectionExclusive, dataType }) =>
        bindActionCreators(
          {
            changeSelection: changeSelection({
              dataType,
              selectionType: isSelectionExclusive ? 'select' : 'toggle',
            }),
            changeAllSelection: changeSelection({ dataType, selectionType: 'toggleAll' }),
          },
          dispatch,
        ),
    ),
    branch(({ dimensions }) => anyPass([isNil, isEmpty])(dimensions), renderNothing),
    withProps(({ dimensions, activeTab }) => {
      // death indicator values are irrelevant in map
      if (not(equals(activeTab, 2))) return {};
      return {
        dimensions: map(dimension => {
          if (not(propEq('id', INDICATOR, dimension))) return dimension;
          return over(lensProp('values'), filter(propEq('isRate', true)))(dimension);
        }, dimensions),
      };
    }),
    withProps(({ dimensions, isSelectionExclusive, isExcNoSexIndicatorValue }) => {
      // on some indicator values, sex is irrelevant, only total is kept
      if (not(isExcNoSexIndicatorValue) || not(isSelectionExclusive)) return {};
      return {
        dimensions: map(dimension => {
          if (not(propEq('id', SEX, dimension))) return dimension;
          return over(
            lensProp('values'),
            map(value => ({ ...value, isDisabled: not(propEq('id', SEX_TOTAL_VALUE, value)) })),
          )(dimension);
        }, dimensions),
      };
    }),
  );

export const DataAllDimensions = withDimensions(getDimensionsWithAggregates)(Component);
export const DataOtherDimensions = withDimensions(getOtherDimensions)(Component);
