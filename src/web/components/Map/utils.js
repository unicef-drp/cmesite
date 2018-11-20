import { path, length, divide, last, prop } from 'ramda';

export const getDatapoint = ({ d, datapoints }) => {
  const code = path(['properties', 'code'], d);
  return prop(code, datapoints);
};

export const getColor = ({ scale, datapoint, noneColor }) => {
  const y = prop('y', datapoint);
  return y ? scale(y) : noneColor;
};

export const getSteps = scale => length(scale.range());

export const getInterval = scale => divide(last(scale.domain()), getSteps(scale));
