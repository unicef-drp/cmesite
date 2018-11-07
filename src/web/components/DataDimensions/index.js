import { isNil, isEmpty, anyPass } from 'ramda';
import { compose, branch, renderNothing } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getDimensions, getOtherDimensions } from '../../selectors/data';
import { changeSelection } from '../../ducks/data';
import Component from './component';

const withDimensions = selector =>
  compose(
    withRouter,
    connect(createStructuredSelector({ dimensions: selector }), (dispatch, { history }) =>
      bindActionCreators(
        {
          changeSelection: changeSelection({ type: 'toggle', path: history.location.pathname }),
          changeAllSelection: changeSelection({
            type: 'toggleAll',
            path: history.location.pathname,
          }),
        },
        dispatch,
      ),
    ),
    branch(({ dimensions }) => anyPass([isNil, isEmpty])(dimensions), renderNothing),
  );

export const withAllDimensions = withDimensions(getDimensions);
export const DataAllDimensions = withAllDimensions(Component);
export const DataOtherDimensions = withDimensions(getOtherDimensions)(Component);
