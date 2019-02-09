import axios from 'axios';
import { map, fromPairs, prop, compose, toPairs, forEach, join } from 'ramda';

let globalConfig = { debug: true };
const endPoint = (path, config = globalConfig) => `${config.endpoint}${path}`;

const postFields = join(',')(['id', 'title', 'content', 'modified_gmt', 'tags', 'acf']);
const getPosts = ({ postType = 'posts' }) =>
  axios
    .get(endPoint(`/${postType}?fields=${postFields}&order=desc&orderBy=modified&per_page=100`))
    .then(prop('data'));

/* eslint-disable-line no-shadow */
const config = config => (globalConfig = { ...globalConfig, ...config });

const methods = { config, getPosts };

const error = method => () => {
  throw new Error(`Unkown method: ${method}`);
};
const main = ({ method, ...rest }) => (methods[method] || error(method))(rest);
compose(forEach(([name, fn]) => (main[name] = fn)), toPairs)(methods);
main.endpoints = compose(fromPairs, map(([k]) => [k, k]), toPairs)(methods);

export default main;
