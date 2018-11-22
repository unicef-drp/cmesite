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
  or,
  and,
  equals,
  complement,
} from 'ramda';
import { filterArtefacts, dataQuery } from '../lib/sdmx';
import { COMPARE } from '../api/sdmx';
import { getSelectedDimensionValue } from '../utils';
import {
  REF_AREA,
  INDICATOR,
  SEX,
  RELEVANT_DIMENSIONS,
  ESTIMATE,
  INCLUDED,
  EXCLUDED,
} from '../constants';

export const getData = prop('data');
export const getActiveTab = createSelector(getData, prop('activeTab'));
export const getNotes = always(`
  Included Data points refer to aliquip perpetua vel in, alia vide alterum vim et. 
  Quo mutat dolore semper id. Ne vim quodsi imperdiet, quando facilisis eu mel. 
  Tation alterum facilisi vis ea. No sale movet munere ius. Ne his putant minimum. 
  Pro ut enim dicta prompta. Ad porro discere nam. Usu accumsan theophrastus necessitatibus ea, 
  et usu quaeque adversarium. His et nonumy voluptua, quo utinam audire petentium in. 
  Libris putant vim in. His legimus electram salutandi ad, eum nisl oratio omnesque eu. 
  Pro tale vero ea, soleat ignota ei sea. Ex accumsan nominati consequat nec, zril prodesset 
  repudiandae in cum. Ne his putant minimum. Pro ut enim dicta prompta. Ad porro discere nam. 
  Usu accumsan theophrastus necessitatibus ea, et usu quaeque adversarium. His et nonumy voluptua, 
  quo utinam audire petentium in. Libris putant vim in. His legimus electram salutandi ad, 
  eum nisl oratio omnesque eu
`);
export const getIsLoadingStructure = createSelector(getData, prop('isLoadingStructure'));
export const getIsLoadingData = createSelector(getData, prop('isLoadingData'));
export const getDownloadingData = createSelector(getData, prop('downloadingData'));
export const getRawDimensions = createSelector(getData, prop('dimensions'));
export const getIsToggledStale = createSelector(getData, prop('isToggledStale'));
export const getIsSelectedStale = createSelector(getData, prop('isSelectedStale'));
export const getDimensions = createSelector(getRawDimensions, filterArtefacts(RELEVANT_DIMENSIONS));
export const getCountryDimension = createSelector(getDimensions, find(propEq('id', REF_AREA)));
export const getIndicatorDimension = createSelector(getDimensions, find(propEq('id', INDICATOR)));
export const getSexDimension = createSelector(getDimensions, find(propEq('id', SEX)));
export const getCountryValue = createSelector(getCountryDimension, getSelectedDimensionValue);
export const getIndicatorValue = createSelector(getIndicatorDimension, getSelectedDimensionValue);
export const getSexValue = createSelector(getSexDimension, getSelectedDimensionValue);
export const getOtherDimensions = createSelector(
  getCountryDimension,
  getDimensions,
  useWith(reject, [eqBy(prop('id')), identity]),
);
export const getTitle = createSelector(
  getOtherDimensions,
  dataQuery({ dimensionSeparator: ' ', valueSeparator: ' ', key: 'label' }),
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
export const getShouldLoadData = dataType =>
  createSelector(getIsToggledStale, getIsSelectedStale, (isToggledStale, isSelectedStale) => {
    if (isNil(dataType)) return false;
    return or(
      and(equals(dataType, COMPARE), isToggledStale),
      and(complement(equals)(dataType, COMPARE), isSelectedStale),
    );
  });
