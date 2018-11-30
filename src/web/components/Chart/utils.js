import { min as d3Min, max as d3Max } from 'd3-array';
import { symbol, symbols } from 'd3-shape';
import {
  equals,
  pipe,
  prop,
  props,
  toLower,
  complement,
  last,
  propOr,
  min,
  head,
  max,
  reduce,
  flatten,
  isEmpty,
  isNil,
  reject,
  length,
} from 'ramda';
import { ESTIMATE, EXCLUDED } from '../../constants';

export const isEstimate = equals(ESTIMATE);

export const hasSymbols = complement(isEstimate);

export const symbolGenerator = (size, index) =>
  symbol()
    .type(symbols[index % length(symbols)])
    .size(size);

export const getSymbolFill = (type, index, theme, isUncertainty) => {
  if (equals(type, EXCLUDED)) return 'none';
  return getColor(type, index, theme, isUncertainty);
};

export const getClass = (type, classes) => ({
  line: isEstimate(type) ? prop('estimate', classes) : prop(toLower(type), classes),
});

export const getColor = (type, index, theme, isUncertainty) => {
  if (isUncertainty) return theme.palette.secondary.dark;
  else if (isEstimate(type)) return theme.palette.primary.main;
  return theme.palette.chartColorScale(index);
};

export const getExtents = (...series) => {
  const validSeries = reject(isNil, series);
  if (isEmpty(validSeries)) return { x: [], y: [] };

  return reduce(
    (extents, serie) => {
      const datapoints = propOr([], 'datapoints', serie);

      return {
        x: [
          min(head(prop('x', extents)), prop('x', head(datapoints))),
          max(last(prop('x', extents)), prop('x', last(datapoints))),
        ],
        y: [
          min(head(prop('y', extents)), d3Min(datapoints, pipe(props(['y', 'y0', 'y1']), d3Min))),
          max(last(prop('y', extents)), d3Max(datapoints, pipe(props(['y', 'y0', 'y1']), d3Max))),
        ],
      };
    },
    { x: [Infinity, -Infinity], y: [Infinity, -Infinity] },
  )(flatten(validSeries));
};
