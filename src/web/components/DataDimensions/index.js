import { isNil, isEmpty, anyPass } from 'ramda';
import { compose, branch, renderNothing } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getDimensions, getOtherDimensions } from '../../selectors/data';
import { changeSelection } from '../../ducks/data';
import Component from './component';

const withDimensions = selector =>
  compose(
    connect(
      createStructuredSelector({ dimensions: selector }),
      (dispatch, { isSelectionExclusive }) =>
        bindActionCreators(
          {
            changeSelection: changeSelection({ type: isSelectionExclusive ? 'select' : 'toggle' }),
            changeAllSelection: changeSelection({ type: 'toggleAll' }),
          },
          dispatch,
        ),
    ),
    branch(({ dimensions }) => anyPass([isNil, isEmpty])(dimensions), renderNothing),
  );

export const withAllDimensions = withDimensions(getDimensions);
export const DataAllDimensions = withAllDimensions(Component);
export const DataOtherDimensions = withDimensions(getOtherDimensions)(Component);
