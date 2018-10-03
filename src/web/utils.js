import { all, equals, any, propEq, both, pipe, propOr } from 'ramda';

const getValues = propOr([], 'values');

export const isAllDimensionValuesSelected = pipe(
  getValues,
  all(propEq('isSelected', true)),
);

export const hasIndeterminateSelection = pipe(
  getValues,
  both(
    any(propEq('isSelected', true)),
    any(pipe(propOr(false, 'isSelected'), equals(false))),
  ),
);
