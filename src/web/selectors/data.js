import { createSelector } from 'reselect';
import {
  prop,
  always,
  useWith,
  identity,
  eqBy,
  find,
  propEq,
  reject,
  times,
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
export const getDownloadingData = createSelector(
  getData,
  prop('downloadingData'),
);
export const getDimensions = createSelector(getData, prop('dimensions'));
export const getCountryDimension = createSelector(
  getDimensions,
  find(propEq('id', 'COUNTRY')),
);
export const getOtherDimensions = createSelector(
  getCountryDimension,
  getDimensions,
  useWith(reject, [eqBy(prop('id')), identity]),
);
export const getChartData = always([
  {
    id: 1,
    type: 'line',
    datapoints: times(
      n => ({ x: new Date(2001 + n, 0, 1), y: n * 4 + 10 }),
      19,
    ),
  },
  {
    id: 2,
    type: 'line',
    datapoints: [
      ...times(n => ({ x: new Date(2001 + n, 0, 1), y: n * 2 + 5 }), 8),
      ...times(n => ({ x: new Date(2009 + n, 0, 1) }), 5),
      ...times(
        n => ({ x: new Date(2014 + n, 0, 1), y: n * 2 + 5 + 13 * 2 }),
        6,
      ),
    ],
  },
  {
    id: 1,
    type: 'area',
    datapoints: times(n => {
      if (n === 10 || n === 11) return { x: new Date(2001 + n, 0, 1) };
      return { x: new Date(2001 + n, 0, 1), y0: n * 3.5 + 2, y1: n * 4.5 + 15 };
    }, 19),
  },
]);
