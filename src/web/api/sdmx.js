import axios from 'axios';
import FileSaver from 'file-saver';
import {
  map,
  fromPairs,
  compose,
  toPairs,
  forEach,
  join,
  prop,
  equals,
  path,
  ifElse,
  always,
  identity,
} from 'ramda';
import { structureParser, dataParser, dataQuery } from '../lib/sdmx';
import { RELEVANT_DIMENSIONS, TIME_PERIOD, REF_AREA, END_PERIOD } from '../constants';
import sdmxStructure from '../../mock/data/sdmxStructure';
import sdmxData from '../../mock/data/sdmxData';
import sdmxDataMap from '../../mock/data/sdmxDataMap';

export const COUNTRY = 'country';
export const COMPARE = 'compare';
export const MAP = 'map';
export const HOME = 'home';
export const DOWNLOAD = 'download';
export const DATA_CONTEXTS = {
  [COUNTRY]: { queryOptions: { dropIds: [TIME_PERIOD], isExclusive: true } },
  [COMPARE]: { queryOptions: { dropIds: [TIME_PERIOD], onlyEstimates: true } },
  [MAP]: {
    queryOptions: {
      dropIds: [REF_AREA],
      isExclusive: true,
      onlyEstimates: true,
      onlyRates: true,
      isMap: true,
    },
    parserOptions: { isMap: true },
  },
  [DOWNLOAD]: { queryOptions: { dropIds: [] } },
};
const dataHeaders = {
  json: 'application/vnd.sdmx.data+json;version=1.0.0-wd',
  xml: 'application/vnd.sdmx.genericdata+xml; version=2.1',
  csv: 'application/vnd.sdmx.data+csv',
};

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

const getData = ({ dimensions, dataType }) => {
  const __dataType = ifElse(equals(HOME), always(MAP), identity)(dataType);
  const { queryOptions, parserOptions } = prop(__dataType, DATA_CONTEXTS);
  const onlyLatestParams = equals(dataType, HOME)
    ? `&startPeriod=${END_PERIOD}&endPeriod=${END_PERIOD}`
    : '';

  return axios
    .get(
      endPoint(
        `/data/${dataflowQuery(',')}/${dataQuery(queryOptions)(
          dimensions,
        )}/?dimensionAtObservation=AllDimensions${onlyLatestParams}`,
      ),
      {
        headers: {
          Accept: prop('json', dataHeaders),
          'Accept-Language': 'en',
        },
      },
    )
    .then(({ data }) => configuredDataParser(data, parserOptions));
};

const getFileData = ({ dimensions, dataType, format, scope }) => {
  const { queryOptions } = prop(dataType, DATA_CONTEXTS);
  const query = equals(scope, 'all') ? scope : dataQuery(queryOptions)(dimensions);
  const url = endPoint(`/data/${dataflowQuery(',')}/${query}`);
  const options = {
    headers: {
      Accept: `${prop(format, dataHeaders)};file=true`,
      'Accept-Language': 'en',
    },
  };

  return axios.get(url, options).then(response => {
    const blob = new Blob([prop('data')(response)], {
      type: path(['headers', 'content-type'])(response),
    });
    FileSaver.saveAs(blob, `download.${format}`);
  });
};

/* eslint-disable-line no-shadow */
const config = config => (globalConfig = { ...globalConfig, ...config });

const methods = {
  config,
  getStructure,
  _getStructure: () =>
    new Promise(resolve => {
      setTimeout(() => resolve(configuredStructureParser(sdmxStructure)), 100);
    }),
  getData,
  _getData: ({ dataType }) => {
    const data = dataType === MAP ? sdmxDataMap : sdmxData;
    const { parserOptions } = prop(dataType, DATA_CONTEXTS);
    return new Promise(resolve => {
      setTimeout(() => resolve(configuredDataParser(data, parserOptions)), 100);
    });
  },
  getFileData,
};

const error = method => () => {
  throw new Error(`Unkown method: ${method}`);
};
const main = ({ method, ...rest }) => (methods[method] || error(method))(rest);
compose(forEach(([name, fn]) => (main[name] = fn)), toPairs)(methods);
main.endpoints = compose(fromPairs, map(([k]) => [k, k]), toPairs)(methods);

export default main;
