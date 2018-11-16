import { path, length, divide, last } from 'ramda';

export const getColor = ({ scale, d, datapoints, noneColor }) => {
  const code = path(['properties', 'code'], d);
  const y = path([code, 'y'], datapoints);
  return y ? scale(y) : noneColor;
};

export const getSteps = scale => length(scale.range());

export const getInterval = scale => divide(last(scale.domain()), getSteps(scale));
