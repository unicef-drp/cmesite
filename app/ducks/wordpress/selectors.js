import * as R from 'ramda';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectWordpress = state => state.wordpress || initialState;

export const makeSelectPosts = postType => createSelector(
  selectWordpress,
  R.pathOr([], [postType, 'posts']),
);

export const makeSelectPost = postType => createSelector(
  makeSelectPosts(postType),
  R.head,
);
