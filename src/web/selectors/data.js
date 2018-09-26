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
  ifElse,
  equals,
  head,
  length,
  groupBy,
  pick,
} from 'ramda';
import { filterArtefacts, dataQuery } from '../lib/sdmx';

export const getData = prop('data');
export const getActiveTab = createSelector(getData, prop('activeTab'));
export const getNotes = always(
  'Included Data points refer to aliquip perpetua vel in, alia vide alterum vim et. Quo mutat dolore semper id. Ne vim quodsi imperdiet, quando facilisis eu mel. Tation alterum facilisi vis ea. No sale movet munere ius. Ne his putant minimum. Pro ut enim dicta prompta. Ad porro discere nam. Usu accumsan theophrastus necessitatibus ea, et usu quaeque adversarium. His et nonumy voluptua, quo utinam audire petentium in. Libris putant vim in. His legimus electram salutandi ad, eum nisl oratio omnesque eu. Pro tale vero ea, soleat ignota ei sea. Ex accumsan nominati consequat nec, zril prodesset repudiandae in cum. Ne his putant minimum. Pro ut enim dicta prompta. Ad porro discere nam. Usu accumsan theophrastus necessitatibus ea, et usu quaeque adversarium. His et nonumy voluptua, quo utinam audire petentium in. Libris putant vim in. His legimus electram salutandi ad, eum nisl oratio omnesque eu',
);
export const getIsLoadingStructure = createSelector(
  getData,
  prop('isLoadingStructure'),
);
export const getIsLoadingData = createSelector(getData, prop('isLoadingData'));
export const getDownloadingData = createSelector(getData, prop('downloadingData'));
export const getRawDimensions = createSelector(getData, prop('dimensions'));
export const getDimensions = createSelector(
  getRawDimensions,
  filterArtefacts(['REF_AREA', 'INDICATOR', 'SEX']),
);
export const getCountryDimension = createSelector(
  getDimensions,
  find(propEq('id', 'REF_AREA')),
);
export const getCountryValue = createSelector(
  getCountryDimension,
  pipe(
    propOr([], 'values'),
    filter(propEq('isSelected', true)),
    ifElse(pipe(length, equals(1)), head, always(null)),
  ),
);
export const getOtherDimensions = createSelector(
  getCountryDimension,
  getDimensions,
  useWith(reject, [eqBy(prop('id')), identity]),
);
export const getTitle = createSelector(
  getOtherDimensions,
  dataQuery(' ', ' ', 'label'),
);
export const getDataSeries = createSelector(
  getData,
  pipe(propOr({}, 'series'), values, groupBy(prop('type'))),
);
export const getDataEstimateSeries = createSelector(
  getDataSeries,
  pick(['ESTIMATE']),
);
