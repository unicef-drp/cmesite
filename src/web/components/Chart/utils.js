import { min as d3Min, max as d3Max } from 'd3-array';
import {
  symbol,
  symbolCircle,
  symbolTriangle,
  symbolDiamond,
  symbolSquare,
  symbolCross,
} from 'd3-shape';
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
} from 'ramda';
import {
  ESTIMATE,
  EXCLUDED,
  DEFAULT_SYMBOL,
  SERIES_METHOD_SYMBOLS,
  MISC_SYMBOL,
} from '../../constants';

export const isEstimate = equals(ESTIMATE);

export const hasSymbols = complement(isEstimate);

const symbols = {
  circle: symbolCircle,
  triangle: symbolTriangle,
  diamond: symbolDiamond,
  square: symbolSquare,
  cross: symbolCross,
};
export const getSymbol = ({ size = 30, shape = DEFAULT_SYMBOL } = {}) =>
  symbol()
    .type(prop(shape, symbols))
    .size(size);
export const getSeriesMethodSymbol = ({ size, method } = {}) =>
  getSymbol({ size, shape: propOr(MISC_SYMBOL, method, SERIES_METHOD_SYMBOLS) });

export const getSymbolFill = (index, theme, isUncertainty) => type => {
  if (equals(type, EXCLUDED)) return 'none';
  return getColor({ type, index, theme, isUncertainty });
};

export const getClass = (type, classes) => ({
  line: isEstimate(type) ? prop('estimate', classes) : prop(toLower(type), classes),
});

export const getColor = ({ index, theme, type, isUncertainty }) => {
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
