import { prop } from 'ramda';
import { createSelector } from 'reselect';

export const getLanguage = prop('language');
export const getLocale = createSelector(getLanguage, prop('locale'));
