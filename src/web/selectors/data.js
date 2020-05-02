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
  map,
  join,
  toLower,
  prepend,
  replace,
  flip,
  reverse,
} from 'ramda';
import numeral from 'numeral';
import { filterArtefacts, dataQuery, formatNestedCodelist, parseNestedCodelist } from '../lib/sdmx';
import { COUNTRY, COMPARE, MAP, DATA_CONTEXTS } from '../api/sdmx';
import { getSelectedDimensionValue, getToggledCombinations, sortByProps } from '../utils';
import {
  REF_AREA,
  INDICATOR,
  SEX,
  SERIES_YEAR,
  RELEVANT_DIMENSIONS,
  ESTIMATE,
  PREVIOUS_ESTIMATE,
  INCLUDED,
  EXCLUDED,
  MAX_SDMX_VALUES,
  EXC_NO_SEX_INDICATOR_VALUES,
  UNIT_MEASURE,
  SERIES_NAME,
  REF_DATE,
  ENHANCED_ESTIMATES_FIELDS,
  ENHANCED_DATASOURCES_FIELDS,
  SERIES_CATEGORY,
  SERIES_METHOD,
  AGE_GROUP_OF_WOMEN,
  TIME_SINCE_FIRST_BIRTH,
  INTERVAL,
  STD_ERR,
  OBS_STATUS,
  OBS_STATUS_VALUES,
  REGION_DEFAULT_VALUE,
  INDICATOR_IDS,
  STILLBIRTH_INDICATOR_IDS,
  DISPARITY_INDICATOR_IDS,
  PROGRESS_INDICATOR_IDS,
} from '../constants';

export const getData = prop('data');
export const getCountryNotes = createSelector(getData, prop('countryNotes'));
export const getCountryTypes = createSelector(getData, prop('countryTypes'));
export const getHighlightedMethods = createSelector(getData, prop('highlightedMethods'));
export const getActiveTab = createSelector(getData, prop('activeTab'));
export const getIsLoadingStructure = createSelector(getData, prop('isLoadingStructure'));
export const getIsLoadingData = createSelector(getData, prop('isLoadingData'));
export const getDownloadingData = createSelector(getData, prop('downloadingData'));
export const getRawDimensions = createSelector(getData, prop('dimensions'));
export const getStale = dataType => createSelector(getData, prop(`${dataType}Stale`));
export const getDimensions = createSelector(getRawDimensions, filterArtefacts(RELEVANT_DIMENSIONS));
export const getCountryDimension = createSelector(getDimensions, find(propEq('id', REF_AREA)));
export const getCountryDimensionWithAggregates = unformatted =>
  createSelector(getCountryDimension, dimension =>
    assoc(
      'values',
      pipe(parseNestedCodelist, ...(unformatted ? [] : [formatNestedCodelist()]))(
        propOr([], 'values', dimension),
      ),
      dimension,
    ),
  );
export const getFilteredCountryDimensionWithAggregates = unformatted =>
  createSelector(
    getCountryDimensionWithAggregates(unformatted),
    getCountryTypes,
    (dimension, { COUNTRY, REGION } = {}) => {
      if (and(COUNTRY, REGION)) return dimension;
      return assoc(
        'values',
        filter(({ id, parent }) => {
          // World is a region without children, algo is generic and see it as a country
          // code below is there to handle the exception
          if (equals(REGION_DEFAULT_VALUE, id)) return REGION;

          // if country is required then values without parent are returned
          // because a country is a value without a parent
          // when a region is hierarchical (except world)
          return COUNTRY ? isNil(parent) : parent;
        }, propOr([], 'values', dimension)),
        dimension,
      );
    },
  );
export const getOtherDimensions = createSelector(
  getDimensions,
  reduce((memo, dimension) => {
    // exclude REF_AREA dimension
    if (equals(dimension.id, REF_AREA)) return memo;

    // filter INDICATOR dimension values
    if (equals(dimension.id, INDICATOR)) {
      const filteredValues = reject(
        ({ id }) => or(DISPARITY_INDICATOR_IDS.has(id), PROGRESS_INDICATOR_IDS.has(id)),
        dimension.values,
      );
      return append({ ...dimension, values: filteredValues }, memo);
    }

    return append(dimension, memo);
  }, []),
);
export const getIndicatorDimension = createSelector(getDimensions, find(propEq('id', INDICATOR)));
export const getRateIndicatorDimension = createSelector(
  getOtherDimensions,
  pipe(
    find(propEq('id', INDICATOR)),
    ifElse(isNil, identity, over(lensProp('values'), filter(propEq('isRate', true)))),
  ),
);
export const getAnalysisIndicatorDimensionValues = createSelector(
  getIndicatorDimension,
  (_, ownProps) => prop('type', ownProps),
  (indicator, type) => {
    if (isNil(indicator)) return [];
    const ids = propOr([], type, INDICATOR_IDS);
    if (isEmpty(ids)) return [];
    return pipe(propOr([], 'values'), filter(({ id }) => ids.has(id)))(indicator);
  },
);
export const getSexDimension = createSelector(getDimensions, find(propEq('id', SEX)));
export const getCountryValue = createSelector(getCountryDimension, getSelectedDimensionValue());
export const getIndicatorValue = createSelector(getIndicatorDimension, getSelectedDimensionValue());
export const getSexValue = createSelector(getSexDimension, getSelectedDimensionValue());
export const getMapIndicatorValue = createSelector(
  getRateIndicatorDimension,
  getSelectedDimensionValue('isMapSelected'),
);
export const getIsStillbirth = createSelector(getIndicatorValue, ({ id }) =>
  STILLBIRTH_INDICATOR_IDS.has(id),
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
export const getDimensionsWithAggregates = createSelector(
  getCountryDimensionWithAggregates(true),
  getOtherDimensions,
  prepend,
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
export const getCountryAllPreviousEstimateSeries = createSelector(
  getCountrySeries,
  prop(PREVIOUS_ESTIMATE),
);
export const getCountryAllEstimateSeries = createSelector(getCountrySeries, prop(ESTIMATE));
export const getCountryAllIncludedSeries = createSelector(getCountrySeries, prop(INCLUDED));
export const getCountryAllExcludedSeries = createSelector(getCountrySeries, prop(EXCLUDED));
export const getCountryDatasourcesSerie = createSelector(
  getCountryAllIncludedSeries,
  getCountryAllExcludedSeries,
  (included = [], excluded = []) =>
    pipe(
      pluck('datapoints'),
      unnest,
      sortByProps([SERIES_YEAR, SERIES_METHOD, SERIES_NAME, REF_DATE]),
      reverse,
    )(concat(included, excluded)),
);
export const getCountryAllEstimateSerieDatapoints = createSelector(
  getCountryAllEstimateSeries,
  pipe(head, propOr([], 'datapoints'), sortBy(prop('x')), reverse),
);
export const getEnhancedCountryAllEstimateSerie = createSelector(
  getCountryAllEstimateSerieDatapoints,
  map(datapoint => ({
    [ENHANCED_ESTIMATES_FIELDS.year]: path([REF_DATE, 'valueName'])(datapoint),
    [ENHANCED_ESTIMATES_FIELDS.estimate]: prop('y')(datapoint),
    [ENHANCED_ESTIMATES_FIELDS.lowerBound]: prop('y0')(datapoint),
    [ENHANCED_ESTIMATES_FIELDS.upperBound]: prop('y1')(datapoint),
  })),
);

export const getCountryDatasourcesSerieTitle = createSelector(
  getCountryValue,
  getIndicatorValue,
  useWith((a, b) => `${a} ${b}`, [propOr('', 'label'), propOr('', 'label')]),
);

const format = ifElse(isNil, always(null), n => numeral(n).format('0.0'));
const mergePropsByKey = (key, props, sep = '') => pipe(pick(props), pluck(key), values, join(sep));

export const getEnhancedCountryDatasourcesSerie = createSelector(
  getCountryDatasourcesSerie,
  map(datapoint => ({
    [ENHANCED_DATASOURCES_FIELDS.name]: pipe(
      path([SERIES_NAME, 'valueName']),
      replace(/\s(\(direct\)|\(indirect\)|\(household\sdeaths\))/i, ''),
    )(datapoint),
    [ENHANCED_DATASOURCES_FIELDS.category]: path([SERIES_CATEGORY, 'valueName'])(datapoint),
    [ENHANCED_DATASOURCES_FIELDS.method]: path([SERIES_METHOD, 'valueName'])(datapoint),
    [ENHANCED_DATASOURCES_FIELDS.aowTsfb]: mergePropsByKey(
      'valueId',
      [AGE_GROUP_OF_WOMEN, TIME_SINCE_FIRST_BIRTH],
      ' ',
    )(datapoint),
    [ENHANCED_DATASOURCES_FIELDS.interval]: path([INTERVAL, 'valueName'])(datapoint),
    [ENHANCED_DATASOURCES_FIELDS.refDate]: path([REF_DATE, 'valueName'])(datapoint),
    [ENHANCED_DATASOURCES_FIELDS.value]: format(prop('y')(datapoint)),
    [ENHANCED_DATASOURCES_FIELDS.stdErr]: format(path([STD_ERR, 'valueName'])(datapoint)),
    [ENHANCED_DATASOURCES_FIELDS.obsStatus]: pipe(
      path([OBS_STATUS, 'valueId']),
      toLower,
      flip(prop)(OBS_STATUS_VALUES),
    )(datapoint),
  })),
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
