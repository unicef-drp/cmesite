import { createSelector } from 'reselect';
import { prop } from 'ramda';

export const getData = prop('data');
export const getActiveTab = createSelector(getData, prop('activeTab'));
