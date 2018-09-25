// import axios from 'axios';
import {
  map,
  fromPairs,
  compose,
  toPairs,
  forEach,
  //pipe,
  //pluck,
  //propEq,
  //filter,
  //join,
  //propOr,
} from 'ramda';
import { structureParser, dataParser /*dataQuery*/ } from '../lib/sdmx';
import sdmxStructure from '../../mock/data/sdmxStructure';
import sdmxData from '../../mock/data/sdmxData';

const mockConfig = {
  dimensionIds: ['REF_AREA', 'INDICATOR', 'SEX'],
  locale: 'en',
};
let globalConfig = { debug: true, ...mockConfig };

/*const endPoint = (path, config = globalConfig) => `${config.endpoint}${path}`;

const dataflowQuery = (separator = '/', config = globalConfig) => {
  const { agencyId, id, version } = config.dataflow;
  return join(separator, [agencyId, id, version]);
};
*/

const configuredStructureParser = (structure, config = globalConfig) =>
  structureParser({ locale: config.locale, dimensionIds: config.dimensionIds })(
    structure,
  );

const configuredDataParser = (data, config = globalConfig) =>
  dataParser({ locale: config.locale })(data);

/*const getStructure = () =>
  axios
    .get(
      endPoint(`/dataflow/${dataflowQuery()}/?references=all`),
    )
    .then();

const getData = (dimensions) =>
  axios
    .get(
      endPoint(`/data/${dataflowQuery(',')}/${dataQuery()(dimensions)}/?dimensionAtObservation=AllDimensions`),
    )
    .then();*/

/* eslint-disable-line no-shadow */
const config = config => (globalConfig = { ...globalConfig, ...config });

const methods = {
  config,
  getStructure: () =>
    new Promise(resolve => {
      setTimeout(() => resolve(configuredStructureParser(sdmxStructure)), 1000);
    }),
  getData: (/*{ dimensions }*/) =>
    new Promise(resolve => {
      setTimeout(() => resolve(configuredDataParser(sdmxData)), 1000);
    }),
};

const error = method => () => {
  throw new Error(`Unkown method: ${method}`);
};
const main = ({ method, ...rest }) => (methods[method] || error(method))(rest);
compose(forEach(([name, fn]) => (main[name] = fn)), toPairs)(methods);
main.endpoints = compose(fromPairs, map(([k]) => [k, k]), toPairs)(methods);

export default main;
