import * as R from 'ramda';
import { createSelector } from 'reselect';

export const getAnalysis = R.prop('analysis');
export const getActiveTab = createSelector(getAnalysis, R.prop('activeTab'));
