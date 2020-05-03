import axios from 'axios';
import {
  map,
  fromPairs,
  compose,
  toPairs,
  forEach,
  join,
  prop,
  equals,
  ifElse,
  always,
  identity,
} from 'ramda';
import {
  structureParser,
  dataParser,
  dataQuery,
  toCsv,
  getEndPeriod,
  parseHierarchicalCodelists,
} from '../lib/sdmx';
import { downloadCsv } from '../utils';
import { RELEVANT_DIMENSIONS, TIME_PERIOD, REF_AREA } from '../constants';

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

const configuredDataParser = (data, parserOptions = {}, config = globalConfig) =>
  dataParser({ locale: config.locale, ...parserOptions })(data);

/*const getStructure = () =>
  axios
    .get(endPoint(`/dataflow/${dataflowQuery()}/?references=all`), {
      headers: {
        Accept: 'application/vnd.sdmx.structure+json;version=1.0',
        'Accept-Language': 'en',
      },
    })
    .then(({ data }) => configuredStructureParser(data));*/

const getStructureFusion = () => {
  const params = join('&', [
    'references=all',
    'format=sdmx-json',
    'detail=structureOnly',
    'includeMetrics=true',
  ]);
  const headers = { headers: { 'Accept-Language': 'en' } };
  return axios
    .get(endPoint(`/availableconstraint/${dataflowQuery(',')}/?${params}`), headers)
    .then(({ data }) => configuredStructureParser(data));
};

const getData = ({ dimensions, dataType }) => {
  const __dataType = ifElse(equals(HOME), always(MAP), identity)(dataType);
  const { queryOptions, parserOptions } = prop(__dataType, DATA_CONTEXTS);
  const endPeriod = getEndPeriod(queryOptions)(dimensions);
  const onlyLatestParams = equals(dataType, HOME)
    ? `&startPeriod=${endPeriod}-06&endPeriod=${endPeriod}-06`
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

export const getAnalysisData = ({ indicatorValueId, startPeriod, endPeriod, source }) => {
  return axios
    .get(
      endPoint(
        `/data/${dataflowQuery(
          ',',
        )}/.${indicatorValueId}._T.UN_IGME_2019../?dimensionAtObservation=AllDimensions&startPeriod=${startPeriod}&endPeriod=${endPeriod}`,
      ),
      {
        headers: { Accept: prop('json', dataHeaders), 'Accept-Language': 'en' },
        cancelToken: source.token,
      },
    )
    .then(({ data }) => configuredDataParser(data, { isMap: true }));
};

export const getHierarchicalCodelists = ({ source }) =>
  axios
    .get(
      endPoint(
        '/hierarchicalcodelist/all/CME_REGIONS_HIERARCHY/latest/?format=sdmx-json&detail=full&references=none',
      ),
      { cancelToken: source.token },
    )
    .then(({ data }) => parseHierarchicalCodelists(globalConfig)(data));

const getFileData = ({ dimensions, dataType, /*format,*/ scope }) => {
  const { queryOptions } = prop(dataType, DATA_CONTEXTS);
  const query = equals(scope, 'all') ? scope : dataQuery(queryOptions)(dimensions);
  //const url = endPoint(`/data/${dataflowQuery(',')}/${query}`);
  const url = endPoint(
    `/data/${dataflowQuery(',')}/${query}/?dimensionAtObservation=AllDimensions`,
  );
  const options = {
    headers: {
      //'Accept': `${prop(format, dataHeaders)};file=true`, // SDMX API is not fulfilling the needs...
      Accept: prop('json', dataHeaders),
      'Accept-Language': 'en',
    },
  };

  return axios.get(url, options).then(({ data }) => {
    const csv = toCsv()(configuredDataParser(data, { isRaw: true }));
    downloadCsv(`${dataflowQuery('-')}-download.csv`, csv);
    /*const blob = new Blob([data], {
      type: path(['headers', 'content-type'])(response),
    });
    FileSaver.saveAs(blob, `download.${format}`);*/
  });
};

/* eslint-disable-line no-shadow */
const config = config => (globalConfig = { ...globalConfig, ...config });

const methods = {
  config,
  getStructure: getStructureFusion,
  getData,
  getFileData,
};

const error = method => () => {
  throw new Error(`Unkown method: ${method}`);
};
const main = ({ method, ...rest }) => (methods[method] || error(method))(rest);
compose(forEach(([name, fn]) => (main[name] = fn)), toPairs)(methods);
main.endpoints = compose(fromPairs, map(([k]) => [k, k]), toPairs)(methods);

export default main;
