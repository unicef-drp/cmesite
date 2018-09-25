import { equals, prop, toLower } from 'ramda';
import { symbol, symbolCircle } from 'd3-shape';

export const symbolGenerator = size =>
  symbol()
    .type(symbolCircle)
    .size(size);

export const getSymbolFill = (type, color) => {
  if (equals(type, 'EXCLUDED')) return 'none';
  return color;
};

export const getClass = (type, isEstimate, classes) => {
  const line = isEstimate
    ? prop('estimates', classes)
    : prop(toLower(type), classes);
  return { line };
};
