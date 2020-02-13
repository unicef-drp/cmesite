import numeral from 'numeral';
import { min as d3Min, max as d3Max } from 'd3-array';
import {
  symbol,
  symbolCircle,
  symbolTriangle,
  symbolDiamond,
  symbolSquare,
  symbolCross,
  symbolStar,
} from 'd3-shape';
import * as R from 'ramda';
import {
  ESTIMATE,
  PREVIOUS_ESTIMATE,
  EXCLUDED,
  DEFAULT_SYMBOL,
  SERIES_METHOD_SYMBOLS,
  MISC_SYMBOL,
} from '../../constants';
import { symbolPentagon, symbolOctagon, symbolTriangleDown } from './symbols';

export const isEstimate = R.equals(ESTIMATE);

export const isPreviousEstimate = R.equals(PREVIOUS_ESTIMATE);

export const hasSymbols = R.both(R.complement(isEstimate), R.complement(isPreviousEstimate));

export const isValidCoord = coord => R.pipe(R.prop(coord), R.is(Number));

export const getTickFormat = R.cond([
  [R.lte(10 ** 6), n => numeral(n).format('0.00a')],
  [R.lte(0), n => numeral(n).format('0a')],
  [R.T, R.always('')],
]);

const symbols = {
  circle: symbolCircle,
  triangle: symbolTriangle,
  diamond: symbolDiamond,
  square: symbolSquare,
  cross: symbolCross,
  star: symbolStar,
  pentagon: symbolPentagon,
  octagon: symbolOctagon,
  triangleDown: symbolTriangleDown,
};
export const getSymbol = ({ size = 30, shape = DEFAULT_SYMBOL } = {}) =>
  symbol()
    .type(R.prop(shape, symbols))
    .size(size);
export const getSeriesMethodSymbol = ({ size, method } = {}) =>
  getSymbol({ size, shape: R.propOr(MISC_SYMBOL, method, SERIES_METHOD_SYMBOLS) });

export const getSymbolFill = (index, theme, isUncertainty) => type => {
  if (R.equals(type, EXCLUDED)) return 'none';
  return getColor({ type, index, theme, isUncertainty });
};

export const getClass = (type, classes) => ({
  line: isEstimate(type) ? R.prop('estimate', classes) : R.prop(R.toLower(type), classes),
});

export const getColor = ({ index, theme, type, isUncertainty }) => {
  if (isUncertainty) return theme.palette.secondary.darker;
  else if (isEstimate(type)) return theme.palette.primary.main;
  return theme.palette.chartColorScale(index);
};

export const getOpacity = ({ type, isHighlighted, hasHighlights }) => {
  if (R.and(isPreviousEstimate(type), R.not(isHighlighted))) return 0;
  return R.and(R.not(isHighlighted), hasHighlights) ? 0.25 : 1;
};

export const getExtents = (...series) => {
  const validSeries = R.reject(R.isNil, series);
  if (R.isEmpty(validSeries)) return { x: [], y: [] };

  return R.reduce(
    (extents, serie) => {
      const datapoints = R.propOr([], 'datapoints', serie);

      return {
        x: [
          R.min(R.head(R.prop('x', extents)), R.prop('x', R.head(datapoints))),
          R.max(R.last(R.prop('x', extents)), R.prop('x', R.last(datapoints))),
        ],
        y: [
          R.min(
            R.head(R.prop('y', extents)),
            d3Min(datapoints, R.pipe(R.props(['y', 'y0', 'y1']), d3Min)),
          ),
          R.max(
            R.last(R.prop('y', extents)),
            d3Max(datapoints, R.pipe(R.props(['y', 'y0', 'y1']), d3Max)),
          ),
        ],
      };
    },
    { x: [Infinity, -Infinity], y: [Infinity, -Infinity] },
  )(R.flatten(validSeries));
};
