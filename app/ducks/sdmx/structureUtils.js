import * as R from 'ramda';
import { EXC_RATE_INDICATOR_VALUE_REGEXP, RELEVANT_DIMENSION_IDS } from 'staticConfig';

const getName = locale => R.path(['name', locale]);

const getDimensionName = (locale, concepts) =>
  R.ifElse(
    R.pipe(R.prop('conceptIdentity'), R.flip(R.has)(concepts)),
    R.pipe(R.prop('conceptIdentity'), R.flip(R.prop)(concepts), getName(locale)),
    R.prop('id'),
  );

const getDimensions = R.pipe(
  R.pathOr({}, ['data', 'dataStructures', 0, 'dataStructureComponents', 'dimensionList']),
  R.pick(['dimensions', 'timeDimensions']),
  R.values,
  R.flatten,
);

const hasId = dimensionIds => R.pipe(R.prop('id'), R.flip(R.contains)(dimensionIds));

export const filterArtefacts = dimensionIds => R.filter(hasId(dimensionIds));

const getConcepts = dimensionIds =>
  R.pipe(
    R.pathOr([], ['data', 'conceptSchemes', 0, 'concepts']),
    filterArtefacts(dimensionIds),
    R.indexBy(R.path(['links', 0, 'urn'])),
  );

const getCodelists = R.pipe(R.pathOr([], ['data', 'codelists']), R.indexBy(R.prop('urn')));

const getValues = (locale, codelists) =>
  R.pipe(
    R.path(['localRepresentation', 'enumeration']),
    R.flip(R.prop)(codelists),
    R.ifElse(
      R.isNil,
      R.always([]),
      R.pipe(
        R.propOr([], 'codes'),
        R.map(code => ({
          id: R.prop('id')(code),
          label: getName(locale)(code),
          isRate: R.test(EXC_RATE_INDICATOR_VALUE_REGEXP, getName(locale)(code)),
        })),
      ),
    ),
  );

export default structure => {
  const locale = 'en';
  const concepts = getConcepts(RELEVANT_DIMENSION_IDS)(structure);
  const codelists = getCodelists(structure);

  const t = R.pipe(
    getDimensions, // not filtered to preserve index for data query
    R.addIndex(R.reduce)(
      (memo, dimension, index) =>
        R.append(
          {
            id: R.prop('id', dimension),
            index,
            position: R.prop('position', dimension),
            ...R.ifElse(
              hasId(RELEVANT_DIMENSION_IDS),
              R.converge((label, values) => ({ label, values }), [
                getDimensionName(locale, concepts),
                getValues(locale, codelists),
              ]),
              R.always({}),
            )(dimension),
          },
          memo,
        ),
      [],
    ),
  )(structure);
  console.log(t);
  return t;
};
