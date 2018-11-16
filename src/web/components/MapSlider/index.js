import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';
import { getMapSeries, getMapIndex } from '../../selectors/data';
import { changeMapIndex } from '../../ducks/data';
import Component from './component';

const enhance = compose(
  connect(
    createStructuredSelector({
      mapSeries: getMapSeries,
      mapIndex: getMapIndex,
    }),
    { changeMapIndex },
  ),
  withState('value', 'setValue', ({ mapIndex }) => mapIndex),
  withHandlers({ onChangeValue: ({ setValue }) => value => setValue(value) }),
);

export default enhance(Component);
