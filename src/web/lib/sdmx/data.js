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
  map,
  merge,
  sortBy,
  lensProp,
  lensPath,
  toPairs,
  split,
  append,
  find,
  values,
  always,
} from 'ramda';
import {
  RELEVANT_DIMENSIONS,
  TYPES,
  Z,
  X,
  Y0,
  Y1,
  ESTIMATE,
} from '../../constants';

const getArtefacts = type => pathOr([], ['data', 'structure', type, 'observation']);

const getObservations = pathOr({}, ['data', 'dataSets', 0, 'observations']);

const getValue = valueIndex => pipe(prop('values'), nth(valueIndex));

const getName = locale => path(['name', locale]);

const getType = observation =>
  pipe(
    find(({ sdmxId, sdmxValue }) =>
      pipe(path([sdmxId, 'valueId']), equals(sdmxValue))(observation),
    ),
    ifElse(isNil, identity, prop('id')),
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

  const type = getType(sdmxObservation)(TYPES);
  if (isNil(type)) return acc;

  const isEstimate = equals(ESTIMATE, type);
  const observation = pipe(
    assoc('x', getX(X)(sdmxObservation)),
    //ifElse(always(isEstimate), assoc('y0', sdmxObservation.y - 10), identity), // TEMP
    //ifElse(always(isEstimate), assoc('y1', sdmxObservation.y + 10), identity), // TEMP
    ifElse(
      always(isEstimate),
      assoc('y0', path([Y0, 'valueId'], sdmxObservation)),
      identity,
    ),
    ifElse(
      always(isEstimate),
      assoc('y1', path([Y1, 'valueId'], sdmxObservation)),
      identity,
    ),
  )(sdmxObservation);
  const serieKey = getSerieKey([...RELEVANT_DIMENSIONS, Z])(observation, type);

  if (has(serieKey, acc))
    return over(lensPath([serieKey, 'datapoints']), append(observation), acc);

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
    map(over(lensProp('datapoints'), sortBy(prop('x')))),
  )(data);
};

export default parser;
