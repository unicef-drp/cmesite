import * as R from 'ramda';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectWordpress = state => state.wordpress || initialState;

export const makeSelectAbout = () => createSelector(
  selectWordpress,
  R.pipe(R.pathOr([], ['abouts', 'posts']), R.head),
);

export const makeSelectFocuses = () => createSelector(
  selectWordpress,
  R.pathOr([], ['focuses', 'posts']),
);
