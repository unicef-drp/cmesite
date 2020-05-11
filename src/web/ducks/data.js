import {
  not,
  over,
  lensPath,
  assoc,
  map,
  addIndex,
  equals,
  reduce,
  prop,
  defaultTo,
  none,
  path,
  nth,
  pipe,
  isEmpty,
  propEq,
  ifElse,
  always,
  identity,
  or,
  findIndex,
  is,
  lt,
  both,
  toLower,
  propSatisfies,
  isNil,
  values,
  cond,
  split,
  last,
  concat,
  join,
  find,
} from 'ramda';
import { startRequest, endRequest, requestError } from './core';
import sdmxApi, { COUNTRY, COMPARE, MAP, HOME } from '../api/sdmx';
import {
  getRawDimensions,
  getStale,
  getCanLoadData,
  getIsExcNoSexIndicatorValueByIndexes,
  getSexDimension,
  getCountryDimension,
  getEnhancedCountryAllEstimateSerie,
  getEnhancedCountryDatasourcesSerie,
  getIndicatorValue,
  getCountryDatasourcesSerieTitle,
} from '../selectors/data';
import {
  TYPES,
  REF_AREA,
  SEX_TOTAL_VALUE,
  ENHANCED_ESTIMATES_FIELDS,
  ENHANCED_DATASOURCES_FIELDS,
  HIERARCHY_LABEL_TOKEN,
  CSV_DL_ESTIMATES_HEADERS,
  CSV_EOL,
  INDICATOR_DEFINITIONS,
  COUNTRY_DEFAULT_VALUE,
  REGION_DEFAULT_VALUE,
} from '../constants';
import { downloadCsv, toCsv } from '../utils';

export const SCOPES = ['selection' /*, 'all'*/];
//export const FORMATS = ['csv', 'xml'];
export const FORMATS = ['csv'];

export const CHANGE_ACTIVE_TAB = 'CM/DATA/CHANGE_ACTIVE_TAB';
export const TOGGLE_DIMENSION_VALUE = 'CM/DATA/TOGGLE_DIMENSION_VALUE';
export const TOGGLE_DIMENSION_VALUES = 'CM/DATA/TOGGLE_DIMENSION_VALUES';
export const SELECT_DIMENSION_VALUE = 'CM/DATA/SELECT_DIMENSION_VALUE';
export const LOADING_STRUCTURE = 'CM/DATA/LOADING_STRUCTURE';
export const STRUCTURE_LOADED = 'CM/DATA/STRUCTURE_LOADED';
export const LOADING_DATA = 'CM/DATA/LOADING_DATA';
export const DATA_LOADED = 'CM/DATA/DATA_LOADED';
export const TOGGLE_DOWNLOADING_DATA = 'CM/DATA/TOGGLE_DOWNLOADING_DATA';
export const TOGGLE_ACTIVE_TYPE = 'CM/DATA/TOGGLE_ACTIVE_TYPE';
export const CHANGE_MAP_INDEX = 'CM/DATA/CHANGE_MAP_INDEX';
export const HIGHLIGHT_SERIE = 'CM/DATA/HIGHLIGHT_SERIE';
export const HIGHLIGHT_METHOD = 'CM/DATA/HIGHLIGHT_METHOD';
export const TOGGLE_COUNTRY_TYPE = 'CM/DATA/TOGGLE_COUNTRY_TYPE';

const activeTypes = reduce(
  (memo, { id, value, sdmxValue }) => (isNil(sdmxValue) ? memo : assoc(id, value, memo)),
  {},
  TYPES,
);

const initialState = {
  activeTab: 0,
  isLoadingStructure: false,
  isLoadingData: false,
  downloadingData: {},
  dimensions: [],
  activeTypes,
  countryStale: true,
  compareStale: true,
  mapStale: true,
  countrySeries: {},
  compareSeries: {},
  mapSeries: {},
  mapIndex: null,
  highlightedMethods: {},
  countryTypes: { COUNTRY: true, REGION: false },
  countryNotes: null,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case HIGHLIGHT_SERIE:
      return over(
        lensPath([`${action.serieType}Series`, action.serieId, 'isHighlighted']),
        not,
        state,
      );
    case HIGHLIGHT_METHOD:
      return over(lensPath(['highlightedMethods', action.methodId]), not, state);
    case CHANGE_ACTIVE_TAB:
      return { ...state, activeTab: action.activeTab };
    case CHANGE_MAP_INDEX:
      return { ...state, mapIndex: action.mapIndex };
    case TOGGLE_DIMENSION_VALUE:
      return pipe(
        over(
          lensPath(['dimensions', action.dimensionIndex, 'values', action.valueIndex, 'isToggled']),
          not,
        ),
        assoc('compareStale', true),
      )(state);
    case TOGGLE_DIMENSION_VALUES:
      return pipe(
        over(
          lensPath(['dimensions', action.dimensionIndex, 'values']),
          map(assoc('isToggled', action.value)),
        ),
        assoc('compareStale', true),
      )(state);
    case SELECT_DIMENSION_VALUE:
      var selectPath = ['dimensions', action.dimensionIndex, 'values'];
      var hasNoToggled = none(prop('isToggled'), path(selectPath, state));
      var isRefArea = pipe(nth(action.dimensionIndex), propEq('id', REF_AREA))(state.dimensions);
      var isDeath = pipe(path([...selectPath, action.valueIndex]), prop('isRate'), not)(state);
      return pipe(
        over(
          lensPath(selectPath),
          addIndex(map)((value, index) => ({
            ...value,
            isSelected: equals(index, action.valueIndex),
            isMapSelected: isDeath ? value.isMapSelected : equals(index, action.valueIndex),
            isToggled: hasNoToggled ? equals(index, action.valueIndex) : value.isToggled,
          })),
        ),
        assoc('countryStale', true),
        assoc('mapStale', or(isRefArea, isDeath) ? state.mapStale : true),
      )(state);
    case LOADING_STRUCTURE:
      return { ...state, isLoadingStructure: true };
    case STRUCTURE_LOADED:
      return { ...state, isLoadingStructure: false, dimensions: defaultTo([], action.dimensions) };
    case LOADING_DATA:
      return { ...state, isLoadingData: true };
    case DATA_LOADED:
      return {
        ...state,
        isLoadingData: false,
        countryNotes: action.countryNotes,
        [`${action.dataType}Series`]: action.series,
        [`${action.dataType}Stale`]: action.staled || false,
      };
    case TOGGLE_DOWNLOADING_DATA:
      return over(lensPath(['downloadingData', `${action.format}.${action.scope}`]), not, state);
    case TOGGLE_ACTIVE_TYPE:
      return over(lensPath(['activeTypes', action.activeType]), not, state);
    case TOGGLE_COUNTRY_TYPE:
      var indexOfRefArea = findIndex(propEq('id', REF_AREA), state.dimensions);
      var valueId = action.countryType === 'COUNTRY' ? COUNTRY_DEFAULT_VALUE : REGION_DEFAULT_VALUE;
      return pipe(
        over(lensPath(['countryTypes', action.countryType]), not),
        over(
          lensPath(['dimensions', indexOfRefArea, 'values']),
          map(value => ({ ...value, isSelected: equals(value.id, valueId) })),
        ),
      )({ ...state, countryStale: true, countryTypes: { COUNTRY: false, REGION: false } });
    default:
      return state;
  }
};

export const highlightSerie = serieType => serieId => ({
  type: HIGHLIGHT_SERIE,
  serieType,
  serieId,
});

export const highlightMethod = methodId => ({ type: HIGHLIGHT_METHOD, methodId });

export const changeMapIndex = mapIndex => ({ type: CHANGE_MAP_INDEX, mapIndex });

export const toggleActiveType = activeType => ({ type: TOGGLE_ACTIVE_TYPE, activeType });

const requestSDMX = (dispatch, ctx, { errorCode } = {}) => {
  const { method } = ctx;
  dispatch(startRequest());
  return sdmxApi(ctx)
    .then(res => {
      dispatch(endRequest());
      return res;
    })
    .catch(err => {
      if (err.response) {
        const {
          data: { errorCode: resErrorCode },
          status,
        } = err.response;
        dispatch(
          requestError({
            method,
            errorCode: errorCode || resErrorCode,
            statusCode: status,
          }),
        );
      } else {
        dispatch(requestError({ method: ctx.method, errorCode }));
      }
      //throw err;
    });
};

export const toggleCountryType = (countryType, historyCallback) => (dispatch, getState) => {
  dispatch({ type: TOGGLE_COUNTRY_TYPE, countryType });
  const countryId = countryType === 'COUNTRY' ? COUNTRY_DEFAULT_VALUE : REGION_DEFAULT_VALUE;
  const countryName = pipe(prop('values'), find(propEq('id', countryId)), prop('label'))(
    getCountryDimension(getState()),
  );
  historyCallback(countryName);
  dispatch(loadData(COUNTRY));
};

export const changeActiveTab = (activeTab, shouldNotGetData) => (dispatch, getState) => {
  dispatch({ type: CHANGE_ACTIVE_TAB, activeTab });

  if (shouldNotGetData) return;

  const dataType = nth(activeTab, [COUNTRY, COMPARE, MAP, null]);
  if (getStale(dataType)(getState())) dispatch(loadData(dataType));
};

export const changeSelection = ({ selectionType, dataType, shouldNotGetData }) => (
  dimensionIndex,
  valueIndex,
) => (dispatch, getState) => {
  if (equals(selectionType, 'toggle'))
    dispatch({ type: TOGGLE_DIMENSION_VALUE, dimensionIndex, valueIndex });
  else if (equals(selectionType, 'toggleAll'))
    dispatch({ type: TOGGLE_DIMENSION_VALUES, dimensionIndex, value: valueIndex });
  else if (equals(selectionType, 'select')) {
    dispatch({ type: SELECT_DIMENSION_VALUE, dimensionIndex, valueIndex });
    if (getIsExcNoSexIndicatorValueByIndexes(dimensionIndex, valueIndex)(getState())) {
      const sexDimension = getSexDimension(getState());
      dispatch({
        type: SELECT_DIMENSION_VALUE,
        dimensionIndex: prop('index', sexDimension),
        valueIndex: findIndex(propEq('id', SEX_TOTAL_VALUE), prop('values', sexDimension)),
      });
    }
  }

  if (shouldNotGetData) return;
  dispatch(loadData(dataType));
};

const changeCountryFromRoute = countryName => (dispatch, getState) => {
  const formattedCountryName = pipe(split(HIERARCHY_LABEL_TOKEN), last, toLower)(countryName);
  const { index, values } = getCountryDimension(getState());
  const valueIndex = findIndex(
    propSatisfies(pipe(toLower, equals(formattedCountryName)), 'label'),
    values,
  );
  if (both(is(Number), lt(-1))(valueIndex))
    dispatch(changeSelection({ selectionType: 'select', dataType: COUNTRY })(index, valueIndex));
};

export const loadStructure = () => (dispatch, getState) => {
  if (not(isEmpty(getRawDimensions(getState())))) return Promise.resolve();

  dispatch({ type: LOADING_STRUCTURE });
  return requestSDMX(dispatch, { method: 'getStructure' }).then(dimensions => {
    dispatch({ type: STRUCTURE_LOADED, dimensions });
  });
};

export const loadStructureAndData = (dataType, countryName) => (dispatch, getState) => {
  if (not(isEmpty(getRawDimensions(getState())))) return dispatch(loadData(dataType));

  dispatch({ type: LOADING_STRUCTURE });
  return requestSDMX(dispatch, { method: 'getStructure' }).then(dimensions => {
    dispatch({ type: STRUCTURE_LOADED, dimensions });
    if (countryName) dispatch(changeCountryFromRoute(countryName));
    dispatch(loadData(dataType));
  });
};

export const loadData = dataType => (dispatch, getState) => {
  const __dataType = ifElse(equals(HOME), always(MAP), identity)(dataType);

  if (not(getStale(__dataType)(getState()))) return;
  if (not(getCanLoadData(__dataType)(getState()))) {
    return dispatch({
      type: DATA_LOADED,
      staled: equals(dataType, HOME),
      dataType: __dataType,
      series: {},
    });
  }

  dispatch({ type: LOADING_DATA });
  if (equals(__dataType, MAP)) dispatch(changeMapIndex());
  return requestSDMX(dispatch, {
    method: 'getData',
    dimensions: getRawDimensions(getState()),
    dataType,
  }).then(({ series, countryNotes } = {}) =>
    dispatch({
      type: DATA_LOADED,
      staled: equals(dataType, HOME),
      dataType: __dataType,
      series,
      countryNotes,
    }),
  );
};

export const downloadData = ({ dataType, format, scope }) => (dispatch, getState) => {
  dispatch({ type: TOGGLE_DOWNLOADING_DATA, format, scope });
  return requestSDMX(dispatch, {
    method: 'getFileData',
    dimensions: getRawDimensions(getState()),
    dataType,
    format,
    scope,
  }).then(() => dispatch({ type: TOGGLE_DOWNLOADING_DATA, format, scope }));
};

export const downloadTable = mode => (_, getState) =>
  pipe(
    cond([
      [
        equals('datasources'),
        always([
          values(ENHANCED_DATASOURCES_FIELDS),
          getEnhancedCountryDatasourcesSerie(getState()),
        ]),
      ],
      [
        equals('estimates'),
        always([values(ENHANCED_ESTIMATES_FIELDS), getEnhancedCountryAllEstimateSerie(getState())]),
      ],
    ]),
    params => toCsv(...params),
    cond([
      [
        always(equals(mode, 'datasources')),
        concat(`${getCountryDatasourcesSerieTitle(getState())}${CSV_EOL}${CSV_EOL}`),
      ],
      [
        always(equals(mode, 'estimates')),
        concat(
          join(
            CSV_EOL,
            concat(CSV_DL_ESTIMATES_HEADERS, [
              `"${prop(prop('id', getIndicatorValue(getState())), INDICATOR_DEFINITIONS)}"`,
              CSV_EOL,
            ]),
          ),
        ),
      ],
    ]),
    downloadCsv('data-download.csv'),
  )(mode);

const actions = {
  changeActiveTab,
  downloadData,
  toggleActiveType,
  loadStructure,
  loadStructureAndData,
  changeSelection,
};

export default { reducer, actions };
