import { isNil, isEmpty, anyPass } from 'ramda';
import { compose, branch, renderNothing } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getOtherDimensions } from '../../selectors/data';
import { toggleDimensionValue } from '../../ducks/data';
import Component from './component';

export const enhance = compose(
  connect(createStructuredSelector({ dimensions: getOtherDimensions }), {
    toggleDimensionValue,
  }),
  branch(
    ({ dimensions }) => anyPass([isNil, isEmpty])(dimensions),
    renderNothing,
  ),
);

export default enhance(Component);
