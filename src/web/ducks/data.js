import { not, over, lensPath, assoc, map, addIndex, equals, reduce, prop } from 'ramda';
import { startRequest, endRequest, requestError } from './core';
import sdmxApi from '../api/sdmx';
import { getRawDimensions } from '../selectors/data';
import { TYPES, TIME_PERIOD } from '../constants';

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
      return over(
        lensPath(['dimensions', action.dimensionIndex, 'values', action.valueIndex, 'isToggled']),
        not,
        state,
      );
    case TOGGLE_DIMENSION_VALUES:
      return over(
        lensPath(['dimensions', action.dimensionIndex, 'values']),
        map(assoc('isToggled', action.value)),
        state,
      );
    case SELECT_DIMENSION_VALUE:
      return over(
        lensPath(['dimensions', action.dimensionIndex, 'values']),
        addIndex(map)((value, index) =>
          assoc('isSelected', equals(index, action.valueIndex), value),
        ),
        state,
      );
    case LOADING_STRUCTURE:
      return { ...state, isLoadingStructure: true };
    case STRUCTURE_LOADED:
      return {
        ...state,
        isLoadingStructure: false,
        dimensions: action.dimensions,
      };
    case LOADING_DATA:
      return { ...state, isLoadingData: true };
    case DATA_LOADED:
      return {
        ...state,
        isLoadingData: false,
        [`${action.key}Series`]: action.series,
      };
    case TOGGLE_DOWNLOADING_DATA:
      return over(lensPath(['downloadingData', `${action.format}.${action.scope}`]), not, state);
    case TOGGLE_ACTIVE_TYPE:
      return over(lensPath(['activeTypes', action.activeType]), not, state);
    default:
      return state;
  }
};

export const changeActiveTab = activeTab => ({
  type: CHANGE_ACTIVE_TAB,
  activeTab,
});

export const changeMapIndex = mapIndex => ({
  type: CHANGE_MAP_INDEX,
  mapIndex,
});

export const toggleActiveType = activeType => ({
  type: TOGGLE_ACTIVE_TYPE,
  activeType,
});

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

export const changeSelection = ({ selectionType, dataType }) => (
  dimensionIndex,
  valueIndex,
) => dispatch => {
  const isToggle = equals(selectionType, 'toggle');
  const isToggleAll = equals(selectionType, 'toggleAll');

  if (isToggle) dispatch({ type: TOGGLE_DIMENSION_VALUE, dimensionIndex, valueIndex });
  else if (isToggleAll)
    dispatch({ type: TOGGLE_DIMENSION_VALUES, dimensionIndex, value: valueIndex });
  else if (equals(selectionType, 'select'))
    dispatch({ type: SELECT_DIMENSION_VALUE, dimensionIndex, valueIndex });

  const dataContexts = {
    COUNTRY: { key: 'country', queryOptions: { dropIds: [TIME_PERIOD], isExclusive: true } },
    COMPARE: { key: 'compare', queryOptions: { dropIds: [TIME_PERIOD], onlyEstimates: true } },
  };

  dispatch(loadData(prop(dataType, dataContexts)));
};

export const loadStructure = () => dispatch => {
  dispatch({ type: LOADING_STRUCTURE });
  return requestSDMX(dispatch, { method: 'getStructure' }).then(dimensions => {
    dispatch({ type: STRUCTURE_LOADED, dimensions });
  });
};

export const loadData = ({ key, queryOptions = {}, parserOptions = {} } = {}) => (
  dispatch,
  getState,
) => {
  dispatch({ type: LOADING_DATA });
  return requestSDMX(dispatch, {
    method: 'getData',
    dimensions: getRawDimensions(getState()),
    queryOptions,
    parserOptions,
  }).then(series => dispatch({ type: DATA_LOADED, key, series }));
};

export const downloadData = ({ format, scope }) => dispatch => {
  dispatch({ type: TOGGLE_DOWNLOADING_DATA, format, scope });
  // get selection or set all
  // use proper http header
  return new Promise(resolve => {
    setTimeout(() => resolve(), 2000);
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
