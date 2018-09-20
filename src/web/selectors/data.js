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
  pathOr,
  pipe,
  nth,
  path,
  addIndex,
  reduce,
  isNil,
  assoc,
  toPairs,
  converge,
  merge,
  head,
  tail,
  last,
  split,
  has,
  over,
  append,
  lensPath,
  equals,
  ifElse,
  sortBy,
  lensProp,
  map,
} from 'ramda';
import { getLocale } from './language';
import factory from '../../mock/data/factory';

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
  find(propEq('id', 'REF_AREA')),
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

// should be in config
const TYPES = [
  ['SERIES_NAME', 269, 'ESTIMATE'],
  ['OBS_STATUS', 'IN', 'INCLUDED'],
  ['OBS_STATUS', 'EX', 'EXCLUDED'],
];
const Z = 'SERIES_NAME';
const X = 'TIME_PERIOD';
//const Y_VARIANTS = [['LOWER_BOUND', 'UPPER_BOUND']];

// should be in utils
export const getValue = valueIndex => pipe(prop('values'), nth(valueIndex));
export const getName = locale => path(['name', locale]);
export const parseArtefact = locale => (valueIndex, artefactIndex) => (
  artefact,
  value,
) => ({
  id: prop('id', artefact),
  name: getName(locale)(artefact),
  index: parseInt(artefactIndex),
  valueId: prop('id', value),
  valueName: getName(locale)(value),
  valueIndex: parseInt(valueIndex),
});
export const parseArtefacts = locale => artefacts =>
  addIndex(reduce)((acc, valueIndex, artefactIndex) => {
    const artefact = nth(artefactIndex, artefacts);
    if (isNil(artefact)) return acc;
    const value = getValue(valueIndex)(artefact);
    if (isNil(value)) return acc;
    return assoc(
      prop('id', artefact),
      parseArtefact(locale)(valueIndex, artefactIndex)(artefact, value),
      acc,
    );
  }, {});
export const parseObservationKey = locale => dimensions =>
  pipe(head, split(':'), parseArtefacts(locale)(dimensions));
export const parseObservationValue = locale => attributes =>
  pipe(
    last,
    converge(merge, [
      pipe(head, y => ({ y })),
      pipe(tail, parseArtefacts(locale)(attributes)),
    ]),
  );
export const parseObservation = locale => (dimensions, attributes) =>
  converge(merge, [
    parseObservationKey(locale)(dimensions),
    parseObservationValue(locale)(attributes),
  ]);
const getType = observation =>
  pipe(
    find(([id, value]) =>
      pipe(path([id, 'valueId']), equals(value))(observation),
    ),
    ifElse(isNil, identity, last),
  );
const getSerieKey = z =>
  useWith((id, type) => `${id}:${type}`, [path([z, 'valueId']), identity]);
const getX = x =>
  pipe(path([x, 'valueId']), ifElse(isNil, identity, id => new Date(id)));

export const getSdmxData = always(factory());
export const getDataStructure = createSelector(
  getSdmxData,
  pathOr({}, ['data', 'structure']),
);
export const getDataDimensions = createSelector(
  getDataStructure,
  pathOr([], ['dimensions', 'observation']),
);
export const getDataAttributes = createSelector(
  getDataStructure,
  pathOr([], ['attributes', 'observation']),
);
export const getDataObservations = createSelector(
  getSdmxData,
  pathOr({}, ['data', 'dataSets', 0, 'observations']),
);
export const getDataSeries = createSelector(
  getLocale,
  getDataDimensions,
  getDataAttributes,
  getDataObservations,
  (locale = 'en', dimensions, attributes, observations) =>
    pipe(
      toPairs,
      reduce((acc, pair) => {
        const sdmxObservation = parseObservation(locale)(
          dimensions,
          attributes,
        )(pair);
        const observation = assoc(
          'x',
          getX(X)(sdmxObservation),
          sdmxObservation,
        );

        const type = getType(observation)(TYPES);
        console.log(dimensions);
        if (isNil(type)) return acc;

        const serieKey = getSerieKey(Z)(observation, type);

        if (has(serieKey, acc)) {
          return over(
            lensPath([serieKey, 'datapoints']),
            append(observation),
            acc,
          );
        }

        const serie = {
          id: serieKey,
          name: path([Z, 'valueName'], observation),
          type,
          datapoints: [observation],
        };

        return assoc(serieKey, serie, acc);
      }, {}),
      map(over(lensProp('datapoints'), sortBy(prop('x')))),
    )(observations),
);
