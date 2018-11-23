import { path, prop } from 'ramda';

export const getDatapoint = ({ d, datapoints }) => {
  const code = path(['properties', 'code'], d);
  return prop(code, datapoints);
};

export const getColor = ({ scale, datapoint }) => {
  const y = prop('y', datapoint);
  return scale(y ? y : -1);
};
