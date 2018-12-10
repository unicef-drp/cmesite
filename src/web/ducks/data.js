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
  none,
  path,
  nth,
  pipe,
  isEmpty,
  propEq,
  ifElse,
  always,
  identity,
} from 'ramda';
import { startRequest, endRequest, requestError } from './core';
import sdmxApi, { COUNTRY, COMPARE, MAP, HOME } from '../api/sdmx';
import { getRawDimensions, getStale, getCanLoadData } from '../selectors/data';
import { TYPES, REF_AREA } from '../constants';

export const FORMATS = ['csv', 'xml'];
export const SCOPES = ['all', 'selection'];

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

const initialState = {
  activeTab: 0,
  isLoadingStructure: false,
  isLoadingData: false,
  downloadingData: {},
  dimensions: [],
  activeTypes: reduce(
    (memo, type) => assoc(prop('id', type), prop('value', type), memo),
    {},
    TYPES,
  ),
  countryStale: true,
  compareStale: true,
  mapStale: true,
  countrySeries: {},
  compareSeries: {},
  mapSeries: {},
  mapIndex: null,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
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
      return pipe(
        over(
          lensPath(selectPath),
          addIndex(map)((value, index) => ({
            ...value,
            isSelected: equals(index, action.valueIndex),
            isToggled: hasNoToggled ? equals(index, action.valueIndex) : value.isToggled,
          })),
        ),
        assoc('countryStale', true),
        assoc(
          'mapStale',
          pipe(nth(action.dimensionIndex), propEq('id', REF_AREA))(state.dimensions)
            ? state.mapStale
            : true,
        ),
      )(state);
    case LOADING_STRUCTURE:
      return { ...state, isLoadingStructure: true };
    case STRUCTURE_LOADED:
      return { ...state, isLoadingStructure: false, dimensions: action.dimensions };
    case LOADING_DATA:
      return { ...state, isLoadingData: true };
    case DATA_LOADED:
      return {
        ...state,
        isLoadingData: false,
        [`${action.dataType}Series`]: action.series,
        [`${action.dataType}Stale`]: false,
      };
    case TOGGLE_DOWNLOADING_DATA:
      return over(lensPath(['downloadingData', `${action.format}.${action.scope}`]), not, state);
    case TOGGLE_ACTIVE_TYPE:
      return over(lensPath(['activeTypes', action.activeType]), not, state);
    default:
      return state;
  }
};

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
      throw err;
    });
};

export const changeActiveTab = activeTab => (dispatch, getState) => {
  dispatch({ type: CHANGE_ACTIVE_TAB, activeTab });

  const dataType = nth(activeTab, [COUNTRY, COMPARE, MAP, null]);
  if (getStale(dataType)(getState())) dispatch(loadData(dataType));
};

export const changeSelection = ({ selectionType, dataType }) => (
  dimensionIndex,
  valueIndex,
) => dispatch => {
  if (equals(selectionType, 'toggle'))
    dispatch({ type: TOGGLE_DIMENSION_VALUE, dimensionIndex, valueIndex });
  else if (equals(selectionType, 'toggleAll'))
    dispatch({ type: TOGGLE_DIMENSION_VALUES, dimensionIndex, value: valueIndex });
  else if (equals(selectionType, 'select'))
    dispatch({ type: SELECT_DIMENSION_VALUE, dimensionIndex, valueIndex });
  dispatch(loadData(dataType));
};

export const loadStructure = dataType => (dispatch, getState) => {
  if (not(isEmpty(getRawDimensions(getState())))) return dispatch(loadData(dataType));

  dispatch({ type: LOADING_STRUCTURE });
  return requestSDMX(dispatch, { method: 'getStructure' }).then(dimensions => {
    dispatch({ type: STRUCTURE_LOADED, dimensions });
    dispatch(loadData(dataType));
  });
};

export const loadData = dataType => (dispatch, getState) => {
  const __dataType = ifElse(equals(HOME), always(MAP), identity)(dataType);

  if (not(getStale(__dataType)(getState()))) return;
  if (not(getCanLoadData(__dataType)(getState()))) return;

  dispatch({ type: LOADING_DATA });
  if (equals(__dataType, MAP)) dispatch(changeMapIndex());
  return requestSDMX(dispatch, {
    method: 'getData',
    dimensions: getRawDimensions(getState()),
    dataType,
  }).then(series => dispatch({ type: DATA_LOADED, dataType: __dataType, series }));
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

const actions = {
  changeActiveTab,
  downloadData,
  toggleActiveType,
  loadStructure,
  changeSelection,
};

export default { reducer, actions };
