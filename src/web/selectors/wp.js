import {
  prop,
  propOr,
  pipe,
  take,
  last,
  head,
  filter,
  pathEq,
  contains,
  find,
  pathOr,
  groupBy,
  reject,
  path,
  pick,
  isNil,
  equals,
} from 'ramda';
import { createSelector } from 'reselect';
import { DATASET_TYPES } from '../constants';

export const getWP = prop('wp');

export const getReportType = createSelector(getWP, prop('reportType'));
export const getSplash = createSelector(getWP, pipe(propOr([], 'splashes'), head));
export const getNews = createSelector(getWP, pipe(propOr([], 'news'), take(2)));
const getDatasets = createSelector(getWP, propOr([], 'datasets'));
export const getReports = createSelector(getWP, propOr([], 'reports'));
export const getFocuses = createSelector(getWP, propOr([], 'focuses'));
export const getAbout = createSelector(getWP, pipe(propOr([], 'abouts'), head));
export const getMethods = createSelector(getWP, propOr([], 'methods'));
export const getDatanotes = createSelector(getWP, propOr([], 'datanotes'));
export const getDownloads = createSelector(getWP, propOr([], 'downloads'));

export const getDatanote = dataType =>
  createSelector(getDatanotes, find(pipe(pathOr([], ['acf', 'tabs']), contains(dataType))));

export const getDatasetsUpdatedAt = createSelector(getDatasets, pipe(last, prop('modified_gmt')));

export const getFeaturedReports = createSelector(
  getReports,
  filter(pathEq(['acf', 'ishome'], true)),
);

export const getMethodReports = createSelector(
  getReports,
  filter(pathEq(['acf', 'ismethod'], true)),
);

export const getReportsByType = createSelector(
  getReports,
  getReportType,
  (reports, type = 'all') => {
    if (equals('all', type)) return reports;
    return filter(pathEq(['acf', 'type'], type), reports);
  },
);

export const getDownload = type =>
  createSelector(getDownloads, find(pathEq(['acf', 'downloadtype'], type)));

const getFilteredDatasets = createSelector(getDatasets, reject(pipe(path(['acf', 'file']), isNil)));

export const getDatasetsGroupedByType = createSelector(
  getFilteredDatasets,
  pipe(groupBy(path(['acf', 'type'])), pick(DATASET_TYPES)),
);
