/**
 * The global state selectors
 */

import * as R from 'ramda';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentUser,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectRepos = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData.repositories,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectAbout = () =>
  createSelector(
    selectGlobal,
    R.pipe(R.propOr([], 'aboutPosts'), R.head),
  );

const makeSelectFocuses = () =>
  createSelector(
    selectGlobal,
    R.propOr([], 'focusPosts'),
  );

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectAbout,
  makeSelectFocuses,
};
