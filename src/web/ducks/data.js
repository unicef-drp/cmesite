import { not, over, lensPath, assoc, map, addIndex, equals } from 'ramda';
import { dimensions as __dimensions } from '../../mock/data';

export const CHANGE_ACTIVE_TAB = 'CM/DATA/CHANGE_ACTIVE_TAB';
export const TOGGLE_DIMENSION_VALUE = 'CM/DATA/TOGGLE_DIMENSION_VALUE';
export const SELECT_DIMENSION_VALUE = 'CM/DATA/SELECT_DIMENSION_VALUE';
export const LOADING_STRUCTURE = 'CM/DATA/LOADING_STRUCTURE';
export const STRUCTURE_LOADED = 'CM/DATA/STRUCTURE_LOADED';
export const types = {
  CHANGE_ACTIVE_TAB,
  TOGGLE_DIMENSION_VALUE,
  SELECT_DIMENSION_VALUE,
  LOADING_STRUCTURE,
  STRUCTURE_LOADED,
};

const initialState = {
  activeTab: 0,
  isLoadingStructure: false,
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

export const loadStructure = () => dispatch => {
  dispatch({ type: LOADING_STRUCTURE });
  return new Promise(resolve => {
    setTimeout(() => resolve({ dimensions: __dimensions }), 100);
  }).then(({ dimensions }) => dispatch({ type: STRUCTURE_LOADED, dimensions }));
};

const actions = { changeActiveTab, toggleDimensionValue, selectDimensionValue };

export default { reducer, actions };
