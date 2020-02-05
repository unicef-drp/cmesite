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
  propOr,
  filter,
  propEq,
  cond,
  T,
  F,
  flip,
  contains,
  both,
  indexBy,
  difference,
  take,
  concat,
  omit,
  is,
  indexOf,
} from 'ramda';
import {
  RELEVANT_DIMENSIONS,
  TYPES,
  Z,
  X,
  Y0,
  Y1,
  ESTIMATE,
  ESTIMATE_TYPE,
  TIME_PERIOD,
  REF_AREA,
  SERIES_METHOD,
  INDICATOR,
  SERIES_YEAR,
  UNIT_MEASURE,
  EXCLUDED_DOWNLOAD_DIMENSIONS,
  EXPORT_INDEX_IDS,
  OBS_VALUE,
  MODEL,
  CSV_DELIMITER,
  CSV_EOL,
  COUNTRY_NOTES,
} from '../../constants';

const getValues = propOr([], 'values');
const getValuesFiltered = onlyRates =>
  ifElse(
    propEq('id', INDICATOR),
    pipe(getValues, ifElse(always(onlyRates), filter(propEq('isRate', true)), identity)),
    getValues,
  );

export const dataQuery = ({
  dimensionSeparator = '.',
  valueSeparator = '+',
  key = 'id',
  dropIds = [],
  isExclusive,
  onlyEstimates,
  onlyRates,
  isMap,
} = {}) =>
  pipe(
    map(
      pipe(
        cond([
          [pipe(prop('id'), flip(contains)(dropIds)), always([])],
          [
            both(always(onlyEstimates), propEq('id', prop('sdmxId', ESTIMATE_TYPE))),
            always([{ id: prop('sdmxValue', ESTIMATE_TYPE) }]),
          ],
          [
            always(isExclusive),
            pipe(
              getValuesFiltered(onlyRates),
              find(propEq(isMap ? 'isMapSelected' : 'isSelected', true)),
              flip(append)([]),
            ),
          ],
          [T, pipe(getValuesFiltered(onlyRates), filter(propEq('isToggled', true)))],
        ]),
        pluck(key),
        join(valueSeparator),
      ),
    ),
    join(dimensionSeparator),
  );

const toCsvRow = ({ delimiter, isHeader, excludedArtefactIds }) =>
  map(
    pipe(
      omit(excludedArtefactIds),
      values,
      sortBy(ifElse(is(Number), always(indexOf(OBS_VALUE, EXPORT_INDEX_IDS)), prop('exportIndex'))),
      map(
        ifElse(
          is(Number),
          ifElse(always(isHeader), always('Observation value'), identity),
          pipe(
            ifElse(
              propEq('id', REF_AREA),
              ifElse(always(isHeader), pick(['name', 'id']), pick(['valueName', 'valueId'])),
              ifElse(always(isHeader), pick(['name']), pick(['valueName'])),
            ),
            values,
            join(delimiter),
          ),
          join(delimiter),
        ),
      ),
      join(delimiter),
    ),
  );
export const toCsv = ({
  eol = CSV_EOL,
  delimiter = CSV_DELIMITER,
  excludedArtefactIds = EXCLUDED_DOWNLOAD_DIMENSIONS,
} = {}) =>
  converge(pipe(concat, join(eol)), [
    pipe(take(1), toCsvRow({ delimiter, isHeader: true, excludedArtefactIds })),
    toCsvRow({ delimiter, excludedArtefactIds }),
  ]);

const getArtefacts = type => pathOr([], ['data', 'structure', type, 'observation']);

const getObservations = pathOr({}, ['data', 'dataSets', 0, 'observations']);

const getValue = valueIndex => pipe(prop('values'), nth(valueIndex));

const getName = locale => path(['name', locale]);

const getType = observation =>
  pipe(
    find(({ sdmxId, sdmxValue }) =>
      pipe(
        path([sdmxId, 'valueId']),
        ifElse(isNil, F, valueId => (isNil(sdmxValue) ? true : equals(sdmxValue, valueId))),
      )(observation),
    ),
    ifElse(isNil, identity, prop('id')),
  );

const getSerieKey = ids =>
  useWith((valueIds, type) => `${valueIds}--${type}`, [
    pipe(pick(ids), values, pluck('valueId'), join('-')),
    identity,
  ]);

const getX = x => pipe(path([x, 'valueId']), ifElse(isNil, identity, id => new Date(id)));

const parseArtefact = locale => (valueIndex, artefactIndex) => (artefact, value) => ({
  id: prop('id', artefact),
  name: getName(locale)(artefact),
  index: parseInt(artefactIndex),
  valueId: prop('id', value),
  valueName: getName(locale)(value),
  valueIndex: parseInt(valueIndex),
  exportIndex: indexOf(prop('id', artefact), EXPORT_INDEX_IDS),
});

const parseArtefacts = locale => artefacts =>
  addIndex(reduce)((acc, valueIndex, artefactIndex) => {
    const artefact = nth(artefactIndex, artefacts);
    if (isNil(artefact)) return acc;
    const value = getValue(valueIndex)(artefact);
    //if (isNil(value)) return acc;
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
    converge(merge, [pipe(head, y => ({ y })), pipe(tail, parseArtefacts(locale)(attributes))]),
  );

const parseObservationPair = (locale, dimensions, attributes) =>
  converge(merge, [
    parseObservationKey(locale)(dimensions),
    parseObservationValue(locale)(attributes),
  ]);

const reduceObservation = (locale, pivot, dimensions, attributes) => (acc, pair) => {
  const sdmxObservation = parseObservationPair(locale, dimensions, attributes)(pair);

  const type = getType(sdmxObservation)(TYPES);
  if (isNil(type)) return acc;

  const isEstimate = equals(ESTIMATE, type);
  const observation = pipe(
    assoc('x', getX(X)(sdmxObservation)),
    ifElse(
      always(isEstimate),
      assoc('y0', Number(path([Y0, 'valueId'], sdmxObservation))),
      identity,
    ),
    ifElse(
      always(isEstimate),
      assoc('y1', Number(path([Y1, 'valueId'], sdmxObservation))),
      identity,
    ),
  )(sdmxObservation);
  const serieKey = getSerieKey(pivot)(observation, type);

  if (has(serieKey, acc)) return over(lensPath([serieKey, 'datapoints']), append(observation), acc);

  let serie = {
    id: serieKey,
    name: path([difference(pivot, RELEVANT_DIMENSIONS), 'valueName'], observation),
    type,
    datapoints: [observation],
    ...reduce(
      (memo, key) => ({ ...memo, [key]: path([key, 'valueName'], observation) }),
      {},
      RELEVANT_DIMENSIONS,
    ),
  };

  if (has(SERIES_METHOD, observation))
    serie = assoc(SERIES_METHOD, path([SERIES_METHOD, 'valueId'], observation), serie);

  if (has(SERIES_YEAR, observation))
    serie = assoc(SERIES_YEAR, path([SERIES_YEAR, 'valueId'], observation), serie);

  if (has(UNIT_MEASURE, observation))
    serie = assoc(UNIT_MEASURE, path([UNIT_MEASURE, 'valueName'], observation), serie);

  if (has(INDICATOR, observation))
    serie = assoc(`${INDICATOR}_ID`, path([INDICATOR, 'valueId'], observation), serie);

  if (has(MODEL, observation)) serie = assoc(MODEL, path([MODEL, 'valueName'], observation), serie);

  return assoc(serieKey, serie, acc);
};

const parser = ({ locale, isMap, isRaw }) => data => {
  const dimensions = getArtefacts('dimensions')(data);
  const attributes = getArtefacts('attributes')(data);
  const countryNotes = pipe(find(propEq('id', COUNTRY_NOTES)), path(['name', locale]))(attributes);

  if (isRaw) {
    return pipe(
      getObservations,
      toPairs,
      map(parseObservationPair(locale, dimensions, attributes)),
    )(data);
  }

  const pivot = isMap ? [TIME_PERIOD] : [...RELEVANT_DIMENSIONS, Z];

  const series = pipe(
    getObservations,
    toPairs,
    reduce(reduceObservation(locale, pivot, dimensions, attributes), {}),
    map(
      over(
        lensProp('datapoints'),
        ifElse(always(isMap), indexBy(path([REF_AREA, 'valueId'])), sortBy(prop('x'))),
      ),
    ),
  )(data);

  return { series, countryNotes };
};

export default parser;
