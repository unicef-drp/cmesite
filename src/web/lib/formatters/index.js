import * as R from 'ramda';
import numeral from 'numeral';
import * as C from '../../constants';

export const getDefaultFormatValue = R.ifElse(R.isNil, R.always(null), n =>
  numeral(n).format('0.[00]'),
);

export const getSeriesLabel = R.converge((year, name) => R.replace(year, '', name), [
  R.path([C.SERIES_YEAR, 'valueName']),
  R.path([C.Z, 'valueName']),
]);

export const getLineTooltipLabel = ({ isCompare }) =>
  R.pipe(
    d => R.assocPath([C.SERIES_NAME, 'valueName'], getSeriesLabel(d), d),
    R.pick(isCompare ? [...C.RELEVANT_DIMENSIONS, ...C.TOOLTIP_SERIES_KEYS] : [C.SERIES_NAME]),
    R.values,
    R.pluck('valueName'),
    R.join(' '),
  );

export const getFormatMapYear = n => Math.floor(n);
