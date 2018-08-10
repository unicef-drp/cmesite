import axios from 'axios';
import { map, fromPairs, prop, compose, toPairs, forEach, join } from 'ramda';

let globalConfig = { debug: true };
const endPoint = (path, config = globalConfig) => `${config.endpoint}${path}`;

const postFields = join(',')([
  'id',
  'title',
  'content',
  'modified_gmt',
  'tags',
  'acf',
]);
const getPosts = () =>
  axios
    .get(
      endPoint(
        `/posts?fields=${postFields}&order=asc&orderBy=modified&per_page=100`,
      ),
    )
    .then(prop('data'));

const getTags = () =>
  axios
    .get(endPoint(`/tags?&fields=${join(',')(['id', 'name'])}`))
    .then(prop('data'));

/* eslint-disable-line no-shadow */
const config = config => (globalConfig = { ...globalConfig, ...config });

const methods = {
  config,
  getPosts,
  getTags,
};

const error = method => () => {
  throw new Error(`Unkown method: ${method}`);
};
const main = ({ method, ...rest }) => (methods[method] || error(method))(rest);
compose(forEach(([name, fn]) => (main[name] = fn)), toPairs)(methods);
main.endpoints = compose(fromPairs, map(([k]) => [k, k]), toPairs)(methods);

export default main;
