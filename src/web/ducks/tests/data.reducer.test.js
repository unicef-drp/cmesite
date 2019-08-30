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

describe('web/ducks/data', () => {
  describe('data reducer', () => {
    const { reducer } = ducks;
    const initialState = {
      foo: 'bar',
      test: { number: '42' },
    };
    describe('when called with an empty action', () => {
      it('should return the initial state', () => {
        const action = {};
        const expectedState = initialState;
        expect(reducer(initialState, action)).toEqual(expectedState);
      });
    });

    it('should handle HIGHLIGHT_SERIE', () => {
      const serieType = 'serie-type';
      const serieId = 'serie-id';
      const action = { type: HIGHLIGHT_SERIE, serieType, serieId };
      const state = {
        ...initialState,
        [`${serieType}Series`]: { [serieId]: { isHighlighted: true } },
      };
      const expectedState = {
        ...initialState,
        [`${serieType}Series`]: { [serieId]: { isHighlighted: false } },
      };
      expect(reducer(state, action)).toEqual(expectedState);
    });

    it('should handle HIGHLIGHT_SERIE', () => {
      const serieType = 'serie-type';
      const serieId = 'serie-id';
      const action = { type: HIGHLIGHT_SERIE, serieType, serieId };
      const expectedState = {
        ...initialState,
        [`${serieType}Series`]: { [serieId]: { isHighlighted: true } },
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle HIGHLIGHT_METHOD', () => {
      const methodId = 'method-id';
      const action = { type: HIGHLIGHT_METHOD, methodId };
      const state = { ...initialState, highlightedMethods: { [methodId]: true } };
      const expectedState = { ...initialState, highlightedMethods: { [methodId]: false } };
      expect(reducer(state, action)).toEqual(expectedState);
    });

    it('should handle HIGHLIGHT_METHOD', () => {
      const methodId = 'method-id';
      const action = { type: HIGHLIGHT_METHOD, methodId };
      const expectedState = { ...initialState, highlightedMethods: { [methodId]: true } };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle CHANGE_ACTIVE_TAB', () => {
      const activeTab = 'active-tab';
      const action = { type: CHANGE_ACTIVE_TAB, activeTab };
      const expectedState = { ...initialState, activeTab };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle CHANGE_MAP_INDEX', () => {
      const mapIndex = 'map-index';
      const action = { type: CHANGE_MAP_INDEX, mapIndex };
      const expectedState = { ...initialState, mapIndex };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle TOGGLE_DIMENSION_VALUE', () => {
      const dimensionIndex = 'dimension-index';
      const valueIndex = 'value-index';
      const action = { type: TOGGLE_DIMENSION_VALUE, dimensionIndex, valueIndex };
      const state = {
        ...initialState,
        dimensions: { [dimensionIndex]: { values: { [valueIndex]: { isToggled: true } } } },
        compareStale: true,
      };
      const expectedState = {
        ...initialState,
        dimensions: { [dimensionIndex]: { values: { [valueIndex]: { isToggled: false } } } },
        compareStale: true,
      };
      expect(reducer(state, action)).toEqual(expectedState);
    });

    it('should handle TOGGLE_DIMENSION_VALUE', () => {
      const dimensionIndex = 'dimension-index';
      const valueIndex = 'value-index';
      const action = { type: TOGGLE_DIMENSION_VALUE, dimensionIndex, valueIndex };
      const expectedState = {
        ...initialState,
        dimensions: { [dimensionIndex]: { values: { [valueIndex]: { isToggled: true } } } },
        compareStale: true,
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle TOGGLE_DIMENSION_VALUES', () => {
      const dimensionIndex = 'dimension-index';
      const value = 'value';
      const action = { type: TOGGLE_DIMENSION_VALUES, dimensionIndex, value };
      const state = {
        ...initialState,
        dimensions: {
          [dimensionIndex]: {
            values: [{ isToggled: 42 }, { isToggled: 667 }, { isToggled: 'bar' }],
          },
        },
      };
      const expectedState = {
        ...initialState,
        dimensions: {
          [dimensionIndex]: {
            values: [{ isToggled: value }, { isToggled: value }, { isToggled: value }],
          },
        },
        compareStale: true,
      };
      expect(reducer(state, action)).toEqual(expectedState);
    });

    xit('should handle SELECT_DIMENSION_VALUE', () => {});

    it('should handle LOADING_STRUCTURE', () => {
      const action = { type: LOADING_STRUCTURE };
      const expectedState = { ...initialState, isLoadingStructure: true };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle STRUCTURE_LOADED', () => {
      const dimensions = undefined;
      const action = { type: STRUCTURE_LOADED, dimensions };
      const expectedState = { ...initialState, isLoadingStructure: false, dimensions: [] };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle STRUCTURE_LOADED', () => {
      const dimensions = 'dimensions';
      const action = { type: STRUCTURE_LOADED, dimensions };
      const expectedState = { ...initialState, isLoadingStructure: false, dimensions };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle LOADING_DATA', () => {
      const action = { type: LOADING_DATA };
      const expectedState = { ...initialState, isLoadingData: true };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle DATA_LOADED', () => {
      const series = 'series';
      const staled = undefined;
      const dataType = 'data-type';
      const action = { type: DATA_LOADED, series, staled, dataType };
      const expectedState = {
        ...initialState,
        isLoadingData: false,
        [`${dataType}Series`]: series,
        [`${dataType}Stale`]: false,
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle DATA_LOADED', () => {
      const series = 'series';
      const staled = 'staled';
      const dataType = 'data-type';
      const action = { type: DATA_LOADED, series, staled, dataType };
      const expectedState = {
        ...initialState,
        isLoadingData: false,
        [`${dataType}Series`]: series,
        [`${dataType}Stale`]: staled,
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle TOGGLE_ACTIVE_TYPE', () => {
      const activeType = 'active-type';
      const action = { type: TOGGLE_ACTIVE_TYPE, activeType };
      const state = { ...initialState, activeTypes: { [activeType]: true } };
      const expectedState = { ...initialState, activeTypes: { [activeType]: false } };
      expect(reducer(state, action)).toEqual(expectedState);
    });

    it('should handle TOGGLE_ACTIVE_TYPE', () => {
      const activeType = 'active-type';
      const action = { type: TOGGLE_ACTIVE_TYPE, activeType };
      const expectedState = { ...initialState, activeTypes: { [activeType]: true } };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });
});
