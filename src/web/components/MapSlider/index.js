import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { lte, length } from 'ramda';
import { compose, withState, withHandlers, branch, renderNothing } from 'recompose';
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
  branch(({ mapSeries }) => lte(length(mapSeries), 1), renderNothing),
);

export default enhance(Component);
