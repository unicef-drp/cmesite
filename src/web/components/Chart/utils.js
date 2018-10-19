import { equals, prop, toLower, complement } from 'ramda';
import { symbol, symbolCircle } from 'd3-shape';

const isEstimate = equals('ESTIMATE');

export const hasSymbols = complement(isEstimate);

export const symbolGenerator = size =>
  symbol()
    .type(symbolCircle)
    .size(size);

export const getSymbolFill = (type, index, theme, isUncertainty) => {
  if (equals(type, 'EXCLUDED')) return 'none';
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
