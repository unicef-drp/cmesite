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
  concat,
  props,
  unnest,
  reduce,
  head,
  assoc,
  mergeWithKey,
  append,
  over,
  lensProp,
  isEmpty,
  pluck,
} from 'ramda';
import { filterArtefacts, dataQuery } from '../lib/sdmx';
import { COUNTRY, COMPARE, MAP, DATA_CONTEXTS } from '../api/sdmx';
import { getSelectedDimensionValue, getToggledCombinations, sortByProps } from '../utils';
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
  UNIT_MEASURE,
  SERIES_NAME,
  REF_DATE,
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
export const getMapIndicatorDimension = createSelector(
  getIndicatorDimension,
  ifElse(isNil, identity, over(lensProp('values'), filter(propEq('isRate', true)))),
);
export const getSexDimension = createSelector(getDimensions, find(propEq('id', SEX)));
export const getCountryValue = createSelector(getCountryDimension, getSelectedDimensionValue());
export const getIndicatorValue = createSelector(getIndicatorDimension, getSelectedDimensionValue());
export const getSexValue = createSelector(getSexDimension, getSelectedDimensionValue());
export const getMapIndicatorValue = createSelector(
  getMapIndicatorDimension,
  getSelectedDimensionValue('isMapSelected'),
);
export const getIsExcNoSexIndicatorValue = createSelector(getIndicatorValue, value =>
  EXC_NO_SEX_INDICATOR_VALUES.has(prop('id', value)),
);
export const getIsExcNoSexIndicatorValueByIndexes = (dimensionIndex, valueIndex) =>
  createSelector(
    getRawDimensions,
    pipe(path([dimensionIndex, 'values', valueIndex]), prop('id'), valueId =>
      EXC_NO_SEX_INDICATOR_VALUES.has(valueId),
    ),
  );
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
export const getMapSeries = createSelector(
  getData,
  pipe(propOr({}, 'mapSeries'), values, sortBy(prop('name'))),
);
export const getMapIndex = createSelector(getData, getMapSeries, (data, series) =>
  ifElse(isNil, always(dec(length(series))), identity)(prop('mapIndex', data)),
);
export const getMapSerie = createSelector(getMapIndex, getMapSeries, nth);
export const getRawCountrySeries = createSelector(
  getData,
  pipe(propOr({}, 'countrySeries'), values),
);
export const getCountryHasHighlights = createSelector(
  getRawCountrySeries,
  pipe(find(propEq('isHighlighted', true)), Boolean),
);
export const getCountrySeries = createSelector(getRawCountrySeries, groupBy(prop('type')));
export const getCountryActiveTypes = createSelector(
  getCountrySeries,
  getData,
  useWith(pick, [keys, prop('activeTypes')]),
);
export const getCountryActiveSeries = createSelector(
  getCountryActiveTypes,
  getCountrySeries,
  useWith(pick, [pipe(filter(identity), keys), identity]),
);
export const getCountryEstimateSeries = createSelector(getCountryActiveSeries, prop(ESTIMATE));
export const getCountryIncludedSeries = createSelector(getCountryActiveSeries, prop(INCLUDED));
export const getCountryExcludedSeries = createSelector(getCountryActiveSeries, prop(EXCLUDED));
export const getCountryOtherSeries = createSelector(
  getCountryActiveSeries,
  ifElse(
    isEmpty,
    identity,
    pipe(
      props([INCLUDED, EXCLUDED]),
      reject(isNil),
      unnest,
      groupBy(prop('name')),
      values,
      reduce(
        (memo, series) =>
          pipe(
            ifElse(pipe(length, equals(1)), head, series =>
              assoc(
                'type',
                INCLUDED,
                mergeWithKey((k, l, r) => (k == 'datapoints' ? concat(l, r) : r), ...series),
              ),
            ),
            over(lensProp('datapoints'), sortBy(prop('x'))),
            serie => over(lensProp(prop('type', serie)), append(serie), memo),
          )(series),
        { [INCLUDED]: [], [EXCLUDED]: [] },
      ),
    ),
  ),
);
export const getCountryAllEstimateSeries = createSelector(getCountrySeries, prop(ESTIMATE));
export const getCountryAllIncludedSeries = createSelector(getCountrySeries, prop(INCLUDED));
export const getCountryAllExcludedSeries = createSelector(getCountrySeries, prop(EXCLUDED));
export const getCountryDatasourcesSerie = createSelector(
  getCountryAllIncludedSeries,
  getCountryAllExcludedSeries,
  (included, excluded) =>
    pipe(pluck('datapoints'), unnest, sortByProps([SERIES_NAME, REF_DATE]))(
      concat(included, excluded),
    ),
);
export const getCompareEstimateSeries = createSelector(
  getData,
  pipe(propOr({}, 'compareSeries'), values),
);
export const getCompareHasHighlights = createSelector(
  getCompareEstimateSeries,
  pipe(find(propEq('isHighlighted', true)), Boolean),
);
export const getSeriesNames = createSelector(
  getRawCountrySeries,
  pipe(groupBy(prop('name')), keys),
);
export const getCountrySeriesUnit = createSelector(
  getCountryActiveSeries,
  pipe(
    values,
    unnest,
    groupBy(prop(UNIT_MEASURE)),
    keys,
    ifElse(pipe(length, equals(1)), head, always(null)),
  ),
);
export const getCompareSeriesUnit = createSelector(
  getCompareEstimateSeries,
  pipe(groupBy(prop(UNIT_MEASURE)), keys, ifElse(pipe(length, equals(1)), head, always(null))),
);
export const getCanLoadData = dataType =>
  createSelector(
    getCountryValue,
    getIndicatorValue,
    getMapIndicatorValue,
    getSexValue,
    getDimensions,
    (country, indicator, mapIndicator, sex, dimensions) => {
      if (or(isNil(dataType), isNil(indicator))) return false;
      if (equals(dataType, COUNTRY)) return none(isNil, [country, indicator, sex]);
      else if (equals(dataType, MAP)) return none(isNil, [mapIndicator, sex]);
      else if (equals(dataType, COMPARE)) {
        const combinations = getToggledCombinations(dimensions);
        return and(gt(combinations, 0), lte(combinations, MAX_SDMX_VALUES));
      } else return false;
    },
  );
