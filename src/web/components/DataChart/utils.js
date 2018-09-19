import { equals } from 'ramda';
import { symbol, symbolCircle } from 'd3-shape';

export const symbolGenerator = size =>
  symbol()
    .type(symbolCircle)
    .size(size);
export const getSymbolFill = (type, color) => {
  if (equals(type, 'INCLUDED')) return color;
  return 'none';
};
