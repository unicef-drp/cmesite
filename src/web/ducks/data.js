import { not, over, lensPath, assoc, map, addIndex, equals } from 'ramda';
import { startRequest, endRequest, requestError } from './core';
import sdmxApi from '../api/sdmx';

export const FORMATS = ['csv', 'xml'];
export const SCOPES = ['all', 'selection'];

export const CHANGE_ACTIVE_TAB = 'CM/DATA/CHANGE_ACTIVE_TAB';
export const TOGGLE_DIMENSION_VALUE = 'CM/DATA/TOGGLE_DIMENSION_VALUE';
export const SELECT_DIMENSION_VALUE = 'CM/DATA/SELECT_DIMENSION_VALUE';
export const LOADING_STRUCTURE = 'CM/DATA/LOADING_STRUCTURE';
export const STRUCTURE_LOADED = 'CM/DATA/STRUCTURE_LOADED';
export const TOGGLE_DOWNLOADING_DATA = 'CM/DATA/TOGGLE_DOWNLOADING_DATA';
export const types = {
  CHANGE_ACTIVE_TAB,
  TOGGLE_DIMENSION_VALUE,
  SELECT_DIMENSION_VALUE,
  LOADING_STRUCTURE,
  STRUCTURE_LOADED,
  TOGGLE_DOWNLOADING_DATA,
};

const initialState = {
  activeTab: 0,
  isLoadingStructure: false,
  downloadingData: {},
  dimensions: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_ACTIVE_TAB:
      return { ...state, activeTab: action.activeTab };
    case TOGGLE_DIMENSION_VALUE:
      return over(
        lensPath([
          'dimensions',
          action.dimensionIndex,
          'values',
          action.valueIndex,
          'isSelected',
        ]),
        not,
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
    case TOGGLE_DOWNLOADING_DATA:
      return over(
        lensPath(['downloadingData', `${action.format}.${action.scope}`]),
        not,
        state,
      );
    default:
      return state;
  }
};

export const changeActiveTab = activeTab => ({
  type: CHANGE_ACTIVE_TAB,
  activeTab,
});

export const toggleDimensionValue = (dimensionIndex, valueIndex) => ({
  type: TOGGLE_DIMENSION_VALUE,
  dimensionIndex,
  valueIndex,
});

export const selectDimensionValue = (dimensionIndex, valueIndex) => ({
  type: SELECT_DIMENSION_VALUE,
  dimensionIndex,
  valueIndex,
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

export const loadStructure = () => dispatch => {
  dispatch({ type: LOADING_STRUCTURE });
  return requestSDMX(dispatch, { method: 'getStructure' }).then(dimensions =>
    dispatch({ type: STRUCTURE_LOADED, dimensions }),
  );
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
  toggleDimensionValue,
  selectDimensionValue,
  downloadData,
};

export default { reducer, actions };
