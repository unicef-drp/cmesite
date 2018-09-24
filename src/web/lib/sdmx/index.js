import { map, pipe, filter, pluck, values, join, propOr, propEq } from 'ramda';

export dataParser from './data';
export structureParser, { filterArtefacts } from './structure';

export const dataQuery = (
  dimensionSeparator = '.',
  valueSeparator = '+',
  key = 'id',
) =>
  pipe(
    map(
      pipe(
        propOr([], 'values'),
        filter(propEq('isSelected', true)),
        pluck(key),
        join(valueSeparator),
      ),
    ),
    join(dimensionSeparator),
  );
