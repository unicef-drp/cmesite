import { prop, propOr } from 'ramda';
import { createSelector } from 'reselect';

export const getWP = prop('wp');
export const getWPApiUrl = createSelector(getWP, prop('apiUrl'));
export const getPosts = createSelector(getWP, propOr([], 'posts'));
