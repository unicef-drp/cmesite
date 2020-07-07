import { path, prop, is, defaultTo, propOr } from 'ramda';

export const getDatapoint = ({ d, datapoints }) => {
  const code = path(['properties', 'code'], d);
  return prop(code, datapoints);
};

export const getColor = ({ scale, datapoint, valueAccessor }) => {
  const value = is(Function, valueAccessor)
    ? valueAccessor(datapoint)
    : propOr(-1, defaultTo('y', valueAccessor), datapoint);

  return scale(value);
};
