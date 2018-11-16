import axios from 'axios';
import { map, fromPairs, compose, toPairs, forEach, join } from 'ramda';
import { structureParser, dataParser, dataQuery } from '../lib/sdmx';
import { RELEVANT_DIMENSIONS } from '../constants';
import sdmxStructure from '../../mock/data/sdmxStructure';
import sdmxData from '../../mock/data/sdmxDataMap';

const mockConfig = { locale: 'en' };
let globalConfig = { debug: true, ...mockConfig };

const endPoint = (path, config = globalConfig) => `${config.endpoint}${path}`;

const dataflowQuery = (separator = '/', config = globalConfig) => {
  const { agencyId, id, version } = config.dataflow;
  return join(separator, [agencyId, id, version]);
};

const configuredStructureParser = (structure, config = globalConfig) =>
  structureParser({ locale: config.locale, dimensionIds: RELEVANT_DIMENSIONS })(structure);

const configuredDataParser = (data, parserOptions, config = globalConfig) =>
  dataParser({ locale: config.locale, ...parserOptions })(data);

const getStructure = () =>
  axios
    .get(endPoint(`/dataflow/${dataflowQuery()}/?references=all`), {
      headers: {
        Accept: 'application/vnd.sdmx.structure+json;version=1.0',
        'Accept-Language': 'en',
      },
    })
    .then(({ data }) => configuredStructureParser(data));

const getData = ({ dimensions, queryOptions, parserOptions }) =>
  axios
    .get(
      endPoint(
        `/data/${dataflowQuery(',')}/${dataQuery(queryOptions)(
          dimensions,
        )}/?dimensionAtObservation=AllDimensions`,
      ),
      {
        headers: {
          Accept: 'application/vnd.sdmx.data+json;version=1.0.0-wd',
          'Accept-Language': 'en',
        },
      },
    )
    .then(({ data }) => configuredDataParser(data, parserOptions));

/* eslint-disable-line no-shadow */
const config = config => (globalConfig = { ...globalConfig, ...config });

const methods = {
  config,
  getStructure,
  _getStructure: () =>
    new Promise(resolve => {
      setTimeout(() => resolve(configuredStructureParser(sdmxStructure)), 1000);
    }),
  getData,
  _getData: ({ parserOptions }) =>
    new Promise(resolve => {
      setTimeout(() => resolve(configuredDataParser(sdmxData, parserOptions)), 1000);
    }),
};

const error = method => () => {
  throw new Error(`Unkown method: ${method}`);
};
const main = ({ method, ...rest }) => (methods[method] || error(method))(rest);
compose(forEach(([name, fn]) => (main[name] = fn)), toPairs)(methods);
main.endpoints = compose(fromPairs, map(([k]) => [k, k]), toPairs)(methods);

export default main;
