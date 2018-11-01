import { prop, propOr, pipe, take, last, head, filter, pathEq } from 'ramda';
import { createSelector } from 'reselect';

export const getWP = prop('wp');

export const getSplash = createSelector(getWP, pipe(propOr([], 'splashes'), head));
export const getNews = createSelector(getWP, pipe(propOr([], 'news'), take(2)));
export const getDatasets = createSelector(getWP, propOr([], 'datasets'));
export const getReports = createSelector(getWP, propOr([], 'reports'));
export const getFocuses = createSelector(getWP, propOr([], 'focuses'));
export const getAbout = createSelector(getWP, pipe(propOr([], 'abouts'), head));
export const getMethod = createSelector(getWP, pipe(propOr([], 'methods'), head));

export const getDatasetsUpdatedAt = createSelector(
  getDatasets,
  pipe(last, prop('modified_gmt')),
);

export const getFeaturedReports = createSelector(
  getReports,
  filter(pathEq(['acf', 'ishome'], true)),
);

export const getMethodReports = createSelector(
  getReports,
  filter(pathEq(['acf', 'ismethod'], true)),
);
