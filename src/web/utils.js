import * as R from 'ramda';

const getValues = R.propOr([], 'values');

export const isAllDimensionValuesSelected = R.pipe(getValues, R.all(R.propEq('isToggled', true)));

export const hasIndeterminateSelection = R.pipe(
  getValues,
  R.both(
    R.any(R.propEq('isToggled', true)),
    R.any(R.pipe(R.propOr(false, 'isToggled'), R.equals(false))),
  ),
);

export const getSelectedDimensionValue = (key = 'isSelected') =>
  R.pipe(getValues, R.find(R.propEq(key, true)));

export const getToggledCombinations = R.pipe(
  R.map(R.pipe(getValues, R.filter(R.propEq('isToggled', true)), R.length)),
  R.product,
);

const firstTruthy = ([head, ...tail]) => R.reduce(R.either, head, tail);
const makeComparator = propName =>
  R.comparator((a, b) =>
    R.lt(R.path([propName, 'valueName'], a), R.path([propName, 'valueName'], b)),
  );
export const sortByProps = props => (list = []) =>
  R.sort(firstTruthy(R.map(makeComparator, props)), list);

export const isNotEmpty = R.pipe(R.either(R.isNil, R.isEmpty), R.not);
