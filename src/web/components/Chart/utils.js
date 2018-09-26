import { equals, prop, toLower, complement } from 'ramda';
import { symbol, symbolCircle } from 'd3-shape';

const isEstimate = equals('ESTIMATE');

export const hasSymbols = complement(isEstimate);

export const symbolGenerator = size =>
  symbol()
    .type(symbolCircle)
    .size(size);

export const getSymbolFill = (type, index, theme) => {
  if (equals(type, 'EXCLUDED')) return 'none';
  return getColor(type, index, theme);
};

export const getClass = (type, classes) => ({
  line: isEstimate(type) ? prop('estimate', classes) : prop(toLower(type), classes),
});

export const getColor = (type, index, theme) =>
  isEstimate(type)
    ? theme.palette.primary.main
    : theme.palette.chartColorScale(index);
