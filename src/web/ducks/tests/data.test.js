import { reduce, assoc, prop } from 'ramda';
import { TYPES } from '../../constants';
import ducks, {
  HIGHLIGHT_SERIE,
  HIGHLIGHT_METHOD,
  CHANGE_ACTIVE_TAB,
  CHANGE_MAP_INDEX,
  TOGGLE_DIMENSION_VALUE,
  TOGGLE_DIMENSION_VALUES,
  SELECT_DIMENSION_VALUE,
  LOADING_STRUCTURE,
  STRUCTURE_LOADED,
  LOADING_DATA,
  DATA_LOADED,
  TOGGLE_ACTIVE_TYPE,
} from '../data';

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
  highlightedMethods: {},
};

const reducer = ducks.reducer;

describe('web/ducks/data', () => {
  describe('data reducer', () => {
    describe('when called with an empty action', () => {
      it('should return the initial state', () => {
        const action = {};
        const expectedState = initialState;
        expect(reducer(undefined, action)).toEqual(expectedState);
      });

      it('should return the initial state', () => {
        const action = {};
        const expectedState = initialState;
        expect(reducer(initialState, action)).toEqual(expectedState);
      });
    });

    it('should handle the HIGHLIGHT_SERIE action', () => {
      const action = {};
    });

    it('should handle the HIGHLIGHT_METHOD action', () => {
      const action = {};
    });

    it('should handle the CHANGE_ACTIVE_TAB action', () => {
      const activeTab = 'active-tab';
      const action = { type: CHANGE_ACTIVE_TAB, activeTab };
      const expectedState = assoc('activeTab', activeTab)(initialState);
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle the CHANGE_MAP_INDEX action', () => {
      const mapIndex = 'map-index';
      const action = { type: CHANGE_MAP_INDEX, mapIndex };
      const expectedState = assoc('mapIndex', mapIndex)(initialState);
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle the TOGGLE_DIMENSION_VALUE action', () => {
      const action = {};
    });

    it('should handle the TOGGLE_DIMENSION_VALUES action', () => {
      const action = {};
    });

    it('should handle the SELECT_DIMENSION_VALUE action', () => {
      const action = {};
    });

    it('should handle the LOADING_STRUCTURE action', () => {
      const action = { type: LOADING_STRUCTURE };
      const expectedState = assoc('isLoadingStructure', true)(initialState);
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle the STRUCTURE_LOADED action', () => {
      const action = {};
    });

    it('should handle the LOADING_DATA action', () => {
      const action = { type: LOADING_DATA };
      const expectedState = assoc('isLoadingData', true)(initialState);
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle the DATA_LOADED action', () => {
      const action = {};
    });

    it('should handle the TOGGLE_ACTIVE_TYPE action', () => {
      const action = {};
    });
  });
});
