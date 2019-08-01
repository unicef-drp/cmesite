import * as R from 'ramda';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectWordpress = state => state.wordpress || initialState;

export const makeSelectPosts = postType =>
  createSelector(
    selectWordpress,
    R.pathOr([], [postType, 'posts']),
  );

export const makeSelectLimitedPosts = (postType, limit = 1) =>
  createSelector(
    makeSelectPosts(postType),
    R.pipe(
      R.take(limit),
      R.ifElse(
        R.pipe(R.length, R.gte(1)),
        R.head,
        R.identity,
      ),
    ),
  );

export const makeSelectFilteredPosts = (postType, filterType) =>
  createSelector(
    makeSelectPosts(postType),
    R.filter(R.pathEq(['acf', filterType], true)),
  );
