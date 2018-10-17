import {
  all,
  equals,
  any,
  propEq,
  both,
  pipe,
  propOr,
  filter,
  always,
  ifElse,
  head,
  length,
} from 'ramda';

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

export const getSelectedDimensionValue = pipe(
  propOr([], 'values'),
  filter(propEq('isSelected', true)),
  ifElse(pipe(length, equals(1)), head, always(null)),
);
