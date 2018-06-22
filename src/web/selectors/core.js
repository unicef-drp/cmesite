import { prop } from 'ramda';
import { createSelector } from 'reselect';

export const getCore = prop('core');
export const isFetching = createSelector(getCore, !!prop('pendingRequests'));
