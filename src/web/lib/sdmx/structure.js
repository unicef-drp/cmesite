import {
  addIndex,
  always,
  propOr,
  map,
  pathOr,
  filter,
  indexBy,
  path,
  pipe,
  flip,
  contains,
  prop,
  isNil,
  ifElse,
  has,
  reduce,
  append,
} from 'ramda';

const LANG = 'en';
const getName = path(['name', LANG]);

const getDimensionName = concepts =>
  ifElse(
    pipe(prop('conceptIdentity'), flip(has)(concepts)),
    pipe(prop('conceptIdentity'), flip(prop)(concepts), getName),
    prop('id'),
  );

const getDimensions = dimensionIds =>
  pipe(
    pathOr(
      [],
      [
        'data',
        'dataStructures',
        0,
        'dataStructureComponents',
        'dimensionList',
        'dimensions',
      ],
    ),
    filter(hasId(dimensionIds)),
  );

const hasId = dimensionIds => pipe(prop('id'), flip(contains)(dimensionIds));

const getConcepts = dimensionIds =>
  pipe(
    pathOr([], ['data', 'conceptSchemes', 0, 'concepts']),
    filter(hasId(dimensionIds)),
    indexBy(path(['links', 0, 'urn'])),
  );

const getCodelists = pipe(
  pathOr([], ['data', 'codelists']),
  indexBy(prop('urn')),
);

const getValues = codelists =>
  pipe(
    path(['localRepresentation', 'enumeration']),
    flip(prop)(codelists),
    ifElse(
      isNil,
      always([]),
      pipe(
        propOr([], 'codes'),
        map(code => ({
          id: prop('id')(code),
          label: getName(code),
        })),
      ),
    ),
  );

const parser = ({ dimensionIds }) => structure => {
  const concepts = getConcepts(dimensionIds)(structure);
  const codelists = getCodelists(structure);

  return pipe(
    getDimensions(dimensionIds),
    addIndex(reduce)(
      (memo, dimension, index) =>
        append(
          {
            id: prop('id', dimension),
            index,
            label: getDimensionName(concepts)(dimension),
            values: getValues(codelists)(dimension),
          },
          memo,
        ),
      [],
    ),
  )(structure);
};

export default parser;
