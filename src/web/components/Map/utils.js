import { path, prop, is, propOr, isNil } from 'ramda';

export const getDatapoint = ({ d, datapoints }) => {
  const code = path(['properties', 'code'], d);
  return prop(code, datapoints);
};

export const getValue = ({ datapoint, accessor = 'y', defaultValue }) => {
  if (isNil(datapoint)) return defaultValue;
  return is(Function, accessor) ? accessor(datapoint) : propOr(defaultValue, accessor, datapoint);
};
