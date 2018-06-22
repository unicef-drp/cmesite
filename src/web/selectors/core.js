import { prop } from 'ramda';
import { createSelector } from 'reselect';

export const getCore = prop('core');
export const isFetching = createSelector(getCore, prop('pendingRequests'));
export const getError = createSelector(getCore, prop('error'));
export const hasError = getError;
