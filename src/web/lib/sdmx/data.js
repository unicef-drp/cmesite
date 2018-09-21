import {
  pathOr,
  pipe,
  prop,
  nth,
  path,
  equals,
  isNil,
  ifElse,
  identity,
  last,
  head,
  addIndex,
  reduce,
  converge,
  useWith,
  pick,
  pluck,
  join,
  assoc,
  tail,
  over,
  has,
  gte,
  map,
  merge,
  sortBy,
  lensProp,
  lensPath,
  length,
  toPairs,
  split,
  append,
  reject,
  find,
  values,
  tap,
} from 'ramda';

const DIMENSION_IDS = ['REF_AREA', 'INDICATOR', 'SEX'];
const TYPES = [
  ['SERIES_NAME', '269', 'ESTIMATE'],
  ['OBS_STATUS', 'IN', 'INCLUDED'],
  ['OBS_STATUS', 'EX', 'EXCLUDED'],
];
const Z = 'SERIES_NAME';
const X = 'TIME_PERIOD';
//const Y_VARIANTS = [['LOWER_BOUND', 'UPPER_BOUND']];

const getArtefacts = type =>
  pathOr([], ['data', 'structure', type, 'observation']);

const getObservations = pathOr({}, ['data', 'dataSets', 0, 'observations']);

const getValue = valueIndex => pipe(prop('values'), nth(valueIndex));

const getName = locale => path(['name', locale]);

const getType = observation =>
  pipe(
    find(([id, value]) =>
      pipe(path([id, 'valueId']), equals(value))(observation),
    ),
    ifElse(isNil, identity, last),
  );

const getSerieKey = ids =>
  useWith((valueIds, type) => `${valueIds}--${type}`, [
    pipe(pick(ids), values, pluck('valueId'), join('-')),
    identity,
  ]);

const getX = x =>
  pipe(path([x, 'valueId']), ifElse(isNil, identity, id => new Date(id)));

const parseArtefact = locale => (valueIndex, artefactIndex) => (
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

const parseArtefacts = locale => artefacts =>
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

const parseObservationKey = locale => dimensions =>
  pipe(head, split(':'), parseArtefacts(locale)(dimensions));

const parseObservationValue = locale => attributes =>
  pipe(
    last,
    converge(merge, [
      pipe(head, y => ({ y })),
      pipe(tail, parseArtefacts(locale)(attributes)),
    ]),
  );

const reduceObservation = (locale, dimensions, attributes) => (acc, pair) => {
  const sdmxObservation = converge(merge, [
    parseObservationKey(locale)(dimensions),
    parseObservationValue(locale)(attributes),
  ])(pair);

  const observation = assoc('x', getX(X)(sdmxObservation), sdmxObservation);

  const type = getType(observation)(TYPES);
  if (isNil(type)) return acc;

  const serieKey = getSerieKey([...DIMENSION_IDS, Z])(observation, type);

  if (has(serieKey, acc)) {
    return over(lensPath([serieKey, 'datapoints']), append(observation), acc);
  }

  const serie = {
    id: serieKey,
    name: path([Z, 'valueName'], observation),
    type,
    datapoints: [observation],
  };

  return assoc(serieKey, serie, acc);
};

const parser = ({ locale }) => data => {
  const dimensions = getArtefacts('dimensions')(data);
  const attributes = getArtefacts('attributes')(data);

  return pipe(
    getObservations,
    toPairs,
    reduce(reduceObservation(locale, dimensions, attributes), {}),
    reject(pipe(prop('datapoints'), length, gte(1))),
    map(over(lensProp('datapoints'), sortBy(prop('x')))),
    tap(console.log),
  )(data);
};

export default parser;
