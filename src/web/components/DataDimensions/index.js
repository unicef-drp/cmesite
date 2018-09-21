import { isNil, isEmpty, anyPass } from 'ramda';
import { compose, branch, renderNothing } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getDimensions, getOtherDimensions } from '../../selectors/data';
import { selectDimensionValue } from '../../ducks/data';
import Component from './component';

const withDimensions = selector =>
  compose(
    connect(createStructuredSelector({ dimensions: selector }), {
      selectDimensionValue,
    }),
    branch(
      ({ dimensions }) => anyPass([isNil, isEmpty])(dimensions),
      renderNothing,
    ),
  );

export const withAllDimensions = withDimensions(getDimensions);
export const DataAllDimensions = withAllDimensions(Component);
export const DataOtherDimensions = withDimensions(getOtherDimensions)(
  Component,
);
