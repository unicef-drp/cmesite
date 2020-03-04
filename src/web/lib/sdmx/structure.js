import {
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
  converge,
  values,
  pick,
  flatten,
  addIndex,
  test,
} from 'ramda';
import { RELEVANT_DIMENSIONS_DEFAULTS } from '../../constants';

const getName = locale => path(['name', locale]);

const getDimensionName = (locale, concepts) =>
  ifElse(
    pipe(prop('conceptIdentity'), flip(has)(concepts)),
    pipe(prop('conceptIdentity'), flip(prop)(concepts), getName(locale)),
    prop('id'),
  );

const getDimensions = pipe(
  pathOr({}, ['data', 'dataStructures', 0, 'dataStructureComponents', 'dimensionList']),
  pick(['dimensions', 'timeDimensions']),
  values,
  flatten,
);

const hasId = dimensionIds => pipe(prop('id'), flip(contains)(dimensionIds));

export const filterArtefacts = dimensionIds => filter(hasId(dimensionIds));

const getConcepts = dimensionIds =>
  pipe(
    pathOr([], ['data', 'conceptSchemes', 0, 'concepts']),
    filterArtefacts(dimensionIds),
    indexBy(path(['links', 0, 'urn'])),
  );

const getCodelists = pipe(pathOr([], ['data', 'codelists']), indexBy(prop('urn')));

const getValues = (locale, codelists) =>
  pipe(
    path(['localRepresentation', 'enumeration']),
    flip(prop)(codelists),
    ifElse(
      isNil,
      always([]),
      pipe(
        propOr([], 'codes'),
        addIndex(map)((code, index) => ({
          index,
          id: prop('id')(code),
          label: getName(locale)(code),
          isSelected: RELEVANT_DIMENSIONS_DEFAULTS.has(prop('id')(code)),
          isMapSelected: RELEVANT_DIMENSIONS_DEFAULTS.has(prop('id')(code)), // default is map compliant
          isToggled: RELEVANT_DIMENSIONS_DEFAULTS.has(prop('id')(code)),
          isRate: test(/rate/, getName(locale)(code)),
          parent: prop('parent')(code),
        })),
      ),
    ),
  );

const parser = ({ locale, dimensionIds = [] }) => structure => {
  const concepts = getConcepts(dimensionIds)(structure);
  const codelists = getCodelists(structure);

  return pipe(
    getDimensions, // not filtered to preserve index for data query
    addIndex(reduce)(
      (memo, dimension, index) =>
        append(
          {
            id: prop('id', dimension),
            index,
            position: prop('position', dimension),
            ...ifElse(
              hasId(dimensionIds),
              converge((label, values) => ({ label, values }), [
                getDimensionName(locale, concepts),
                getValues(locale, codelists),
              ]),
              always({}),
            )(dimension),
          },
          memo,
        ),
      [],
    ),
  )(structure);
};

export default parser;
