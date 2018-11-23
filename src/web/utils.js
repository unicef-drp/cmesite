import {
  all,
  equals,
  any,
  propEq,
  both,
  pipe,
  propOr,
  find,
  product,
  map,
  length,
  filter,
} from 'ramda';

const getValues = propOr([], 'values');

export const isAllDimensionValuesSelected = pipe(getValues, all(propEq('isToggled', true)));

export const hasIndeterminateSelection = pipe(
  getValues,
  both(any(propEq('isToggled', true)), any(pipe(propOr(false, 'isToggled'), equals(false)))),
);

export const getSelectedDimensionValue = pipe(getValues, find(propEq('isSelected', true)));

export const getToggledCombinations = pipe(
  map(pipe(getValues, filter(propEq('isToggled', true)), length)),
  product,
);
