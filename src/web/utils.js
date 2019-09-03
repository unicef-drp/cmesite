import * as R from 'ramda';
import FileSaver from 'file-saver';

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

export const downloadCsv = R.curry((name, csv) => {
  const blob = new Blob([csv], { type: 'application/vnd.sdmx.data+csv; charset=utf-8' });
  FileSaver.saveAs(blob, name);
});

export const toCsv = (fields, data = [], { delimiter = ',', eol = '\r\n' } = {}) =>
  R.pipe(
    R.prepend(fields),
    R.map(
      R.pipe(
        R.ifElse(
          R.is(Array),
          R.pickAll(R.pipe(R.length, R.times(R.identity))(fields)),
          R.pickAll(fields),
        ),
        R.values,
        R.join(delimiter),
      ),
    ),
    R.join(eol),
  )(data);
