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
  and,
  not,
  is,
  both,
} from 'ramda';
import {
  ESTIMATE,
  PREVIOUS_ESTIMATE,
  EXCLUDED,
  DEFAULT_SYMBOL,
  SERIES_METHOD_SYMBOLS,
  MISC_SYMBOL,
} from '../../constants';

export const isEstimate = equals(ESTIMATE);

const isPreviousEstimate = equals(PREVIOUS_ESTIMATE);

export const hasSymbols = both(complement(isEstimate), complement(isPreviousEstimate));

export const isValidCoord = coord => pipe(prop(coord), is(Number));

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
  if (isUncertainty) return theme.palette.secondary.darker;
  else if (isEstimate(type)) return theme.palette.primary.main;
  return theme.palette.chartColorScale(index);
};

export const getOpacity = ({ type, isHighlighted, hasHighlights }) => {
  if (and(isPreviousEstimate(type), not(isHighlighted))) return 0;
  return and(not(isHighlighted), hasHighlights) ? 0.25 : 1;
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
