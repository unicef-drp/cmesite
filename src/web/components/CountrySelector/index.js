import { isNil, find, propEq, map, addIndex, prop } from 'ramda';
import {
  compose,
  branch,
  renderNothing,
  withProps,
  withHandlers,
} from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getCountryDimension } from '../../selectors/data';
import { changeSelection } from '../../ducks/data';
import Component from './component';

export const enhance = compose(
  connect(createStructuredSelector({ dimension: getCountryDimension }), {
    changeSelection: changeSelection('select'),
  }),
  branch(({ dimension }) => isNil(dimension), renderNothing),
  withProps(({ dimension }) => ({
    value: find(propEq('isSelected', true), prop('values')(dimension)),
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

export default enhance(Component);
