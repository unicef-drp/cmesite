import axios from 'axios';
import { map, fromPairs, prop, compose, toPairs, forEach } from 'ramda';

let globalConfig = { debug: true };
const endPoint = (path, config = globalConfig) => `${config.endpoint}${path}`;

const getPosts = () => axios.get(endPoint(`/posts?_embed`)).then(prop('data'));

const config = config => (globalConfig = { ...globalConfig, ...config }); // eslint-disable-line no-shadow

const methods = {
  config,
  getPosts,
};

const error = method => () => {
  throw new Error(`Unkown method: ${method}`);
};
const main = ({ method, ...rest }) => (methods[method] || error(method))(rest);
compose(forEach(([name, fn]) => (main[name] = fn)), toPairs)(methods);
main.endpoints = compose(fromPairs, map(([k]) => [k, k]), toPairs)(methods);

export default main;
