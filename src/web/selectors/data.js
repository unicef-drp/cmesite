import { createSelector } from 'reselect';
import {
  prop,
  always,
  useWith,
  append,
  identity,
  omit,
  pipe,
  flip,
} from 'ramda';

export const getData = prop('data');
export const getActiveTab = createSelector(getData, prop('activeTab'));
export const getTitle = always('Female infant mortality rate');
export const getNotes = always(
  'Included Data points refer to aliquip perpetua vel in, alia vide alterum vim et. Quo mutat dolore semper id. Ne vim quodsi imperdiet, quando facilisis eu mel. Tation alterum facilisi vis ea. No sale movet munere ius. Ne his putant minimum. Pro ut enim dicta prompta. Ad porro discere nam. Usu accumsan theophrastus necessitatibus ea, et usu quaeque adversarium. His et nonumy voluptua, quo utinam audire petentium in. Libris putant vim in. His legimus electram salutandi ad, eum nisl oratio omnesque eu. Pro tale vero ea, soleat ignota ei sea. Ex accumsan nominati consequat nec, zril prodesset repudiandae in cum. Ne his putant minimum. Pro ut enim dicta prompta. Ad porro discere nam. Usu accumsan theophrastus necessitatibus ea, et usu quaeque adversarium. His et nonumy voluptua, quo utinam audire petentium in. Libris putant vim in. His legimus electram salutandi ad, eum nisl oratio omnesque eu',
);
export const getIsLoadingStructure = createSelector(
  getData,
  prop('isLoadingStructure'),
);
export const getDimensions = createSelector(getData, prop('dimensions'));
export const getCountryDimension = createSelector(
  getDimensions,
  prop('COUNTRY'),
);
export const getOtherDimensions = createSelector(
  getCountryDimension,
  getDimensions,
  useWith(omit, [pipe(prop('id'), flip(append)([])), identity]),
);
