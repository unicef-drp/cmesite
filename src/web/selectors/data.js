import { createSelector } from 'reselect';
import {
  pipe,
  prop,
  propOr,
  always,
  propEq,
  useWith,
  reject,
  identity,
  eqBy,
  find,
  values,
  filter,
  groupBy,
  keys,
  pick,
  sortBy,
  dec,
  ifElse,
  isNil,
  length,
  nth,
  equals,
  none,
  and,
  gt,
  lte,
  path,
  or,
} from 'ramda';
import { filterArtefacts, dataQuery } from '../lib/sdmx';
import { COUNTRY, COMPARE, MAP, DATA_CONTEXTS } from '../api/sdmx';
import { getSelectedDimensionValue, getToggledCombinations } from '../utils';
import {
  REF_AREA,
  INDICATOR,
  SEX,
  RELEVANT_DIMENSIONS,
  ESTIMATE,
  INCLUDED,
  EXCLUDED,
  MAX_SDMX_VALUES,
  EXC_NO_SEX_INDICATOR_VALUES,
} from '../constants';

export const getData = prop('data');
export const getActiveTab = createSelector(getData, prop('activeTab'));
export const getIsLoadingStructure = createSelector(getData, prop('isLoadingStructure'));
export const getIsLoadingData = createSelector(getData, prop('isLoadingData'));
export const getDownloadingData = createSelector(getData, prop('downloadingData'));
export const getRawDimensions = createSelector(getData, prop('dimensions'));
export const getStale = dataType => createSelector(getData, prop(`${dataType}Stale`));
export const getDimensions = createSelector(getRawDimensions, filterArtefacts(RELEVANT_DIMENSIONS));
export const getCountryDimension = createSelector(getDimensions, find(propEq('id', REF_AREA)));
export const getIndicatorDimension = createSelector(getDimensions, find(propEq('id', INDICATOR)));
export const getSexDimension = createSelector(getDimensions, find(propEq('id', SEX)));
export const getCountryValue = createSelector(getCountryDimension, getSelectedDimensionValue);
export const getIndicatorValue = createSelector(getIndicatorDimension, getSelectedDimensionValue);
export const getIsExcNoSexIndicatorValue = createSelector(getIndicatorValue, value =>
  EXC_NO_SEX_INDICATOR_VALUES.has(prop('id', value)),
);
export const getSexValue = createSelector(getSexDimension, getSelectedDimensionValue);
export const getOtherDimensions = createSelector(
  getCountryDimension,
  getDimensions,
  useWith(reject, [eqBy(prop('id')), identity]),
);
export const getCountryTitle = createSelector(
  getOtherDimensions,
  dataQuery({
    ...path([COUNTRY, 'queryOptions'], DATA_CONTEXTS),
    dimensionSeparator: ' - ',
    valueSeparator: ' ',
    key: 'label',
  }),
);
export const getCompareTitle = createSelector(
  getDimensions,
  dataQuery({
    ...path([COMPARE, 'queryOptions'], DATA_CONTEXTS),
    dimensionSeparator: ' - ',
    valueSeparator: ' and ',
    key: 'label',
  }),
);
export const getActiveTypes = createSelector(getData, prop('activeTypes'));
export const getMapSeries = createSelector(
  getData,
  pipe(propOr({}, 'mapSeries'), values, sortBy(prop('name'))),
);
export const getMapIndex = createSelector(getData, getMapSeries, (data, series) =>
  ifElse(isNil, always(dec(length(series))), identity)(prop('mapIndex', data)),
);
export const getMapSerie = createSelector(getMapIndex, getMapSeries, nth);
export const getCountrySeries = createSelector(
  getData,
  pipe(propOr({}, 'countrySeries'), values, groupBy(prop('type'))),
);
export const getCountryActiveSeries = createSelector(
  getActiveTypes,
  getCountrySeries,
  useWith(pick, [pipe(filter(identity), keys), identity]),
);
export const getCountryEstimateSeries = createSelector(getCountryActiveSeries, prop(ESTIMATE));
export const getCountryIncludedSeries = createSelector(getCountryActiveSeries, prop(INCLUDED));
export const getCountryExcludedSeries = createSelector(getCountryActiveSeries, prop(EXCLUDED));
export const getCompareEstimateSeries = createSelector(
  getData,
  pipe(propOr({}, 'compareSeries'), values),
);
export const getCanLoadData = dataType =>
  createSelector(
    getCountryValue,
    getIndicatorValue,
    getSexValue,
    getDimensions,
    (country, indicator, sex, dimensions) => {
      if (or(isNil(dataType), isNil(indicator))) return false;
      if (equals(dataType, COUNTRY)) return none(isNil, [country, indicator, sex]);
      else if (equals(dataType, MAP))
        return and(none(isNil, [indicator, sex]), propEq('isRate', true, indicator));
      else if (equals(dataType, COMPARE)) {
        const combinations = getToggledCombinations(dimensions);
        return and(gt(combinations, 0), lte(combinations, MAX_SDMX_VALUES));
      } else return false;
    },
  );
