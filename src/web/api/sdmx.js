// import axios from 'axios';
import { map, fromPairs, compose, toPairs, forEach } from 'ramda';
import structureParser from '../lib/sdmx/structure';
import sdmxStructure from '../../mock/data/sdmxStructure';

let globalConfig = { debug: true };
/*const endPoint = (path, config = globalConfig) => `${config.endpoint}${path}`;
const dataflowQuery = (config = globalConfig) => {
  const { agencyId, id, version } = config.dataflow;
  return `${agencyId}/${id}/${version}`;
};*/
const configuredStructureParser = (structure, config = globalConfig) =>
  structureParser({ dimensionIds: config.dimensionIds })(structure);

/*const getStructure = () =>
  axios
    .get(
      endPoint(`/dataflow/${dataflowQuery()}/?references=all`),
    )
    .then();*/

const getData = () => {};

/* eslint-disable-line no-shadow */
const config = config => (globalConfig = { ...globalConfig, ...config });

const methods = {
  config,
  getStructure: () =>
    new Promise(resolve => {
      setTimeout(() => resolve(configuredStructureParser(sdmxStructure)), 1000);
    }),
  getData,
};

const error = method => () => {
  throw new Error(`Unkown method: ${method}`);
};
const main = ({ method, ...rest }) => (methods[method] || error(method))(rest);
compose(forEach(([name, fn]) => (main[name] = fn)), toPairs)(methods);
main.endpoints = compose(fromPairs, map(([k]) => [k, k]), toPairs)(methods);

export default main;
