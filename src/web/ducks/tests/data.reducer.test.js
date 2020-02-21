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
    describe('when called with a empty action', () => {
      it('should return the initial state', () => {
        const action = {};
        const expectedState = initialState;
        expect(reducer(initialState, action)).toEqual(expectedState);
      });
    });

    describe(' HIGHLIGHT_SERIE', () => {
      it('should match', () => {
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

      it('should match', () => {
        const serieType = 'serie-type';
        const serieId = 'serie-id';
        const action = { type: HIGHLIGHT_SERIE, serieType, serieId };
        const expectedState = {
          ...initialState,
          [`${serieType}Series`]: { [serieId]: { isHighlighted: true } },
        };
        expect(reducer(initialState, action)).toEqual(expectedState);
      });
    });

    describe('HIGHLIGHT_METHOD', () => {
      it('should match', () => {
        const methodId = 'method-id';
        const action = { type: HIGHLIGHT_METHOD, methodId };
        const state = { ...initialState, highlightedMethods: { [methodId]: true } };
        const expectedState = { ...initialState, highlightedMethods: { [methodId]: false } };
        expect(reducer(state, action)).toEqual(expectedState);
      });

      it('should match', () => {
        const methodId = 'method-id';
        const action = { type: HIGHLIGHT_METHOD, methodId };
        const expectedState = { ...initialState, highlightedMethods: { [methodId]: true } };
        expect(reducer(initialState, action)).toEqual(expectedState);
      });
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

    describe('TOGGLE_DIMENSION_VALUE', () => {
      it('should match', () => {
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

      it('should match', () => {
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

    describe('SELECT_DIMENSION_VALUE', () => {
      it('should match', () => {
        const valueIndex = 1;
        const dimensionIndex = 0;
        const action = { type: SELECT_DIMENSION_VALUE, valueIndex, dimensionIndex };
        const state = {
          ...initialState,
          dimensions: [{ values: [{}, { test: 'test' }] }],
        };
        const expectedState = {
          ...initialState,
          dimensions: [
            {
              values: [
                {
                  isToggled: false,
                  isMapSelected: undefined,
                  isSelected: false,
                },
                {
                  test: 'test',
                  isToggled: true,
                  isMapSelected: undefined,
                  isSelected: true,
                },
              ],
            },
          ],
          countryStale: true,
          mapStale: undefined,
        };
        expect(reducer(state, action)).toEqual(expectedState);
      });

      it('should match', () => {
        const valueIndex = 1;
        const dimensionIndex = 0;
        const action = { type: SELECT_DIMENSION_VALUE, valueIndex, dimensionIndex };
        const state = {
          ...initialState,
          dimensions: [{ values: [{ isToggled: true }, { test: 'test', isToggled: 'test' }] }],
        };
        const expectedState = {
          ...initialState,
          dimensions: [
            {
              values: [
                {
                  isToggled: true,
                  isMapSelected: undefined,
                  isSelected: false,
                },
                {
                  test: 'test',
                  isToggled: 'test',
                  isMapSelected: undefined,
                  isSelected: true,
                },
              ],
            },
          ],
          countryStale: true,
          mapStale: undefined,
        };
        expect(reducer(state, action)).toEqual(expectedState);
      });

      it('should match', () => {
        const valueIndex = 1;
        const dimensionIndex = 0;
        const action = { type: SELECT_DIMENSION_VALUE, valueIndex, dimensionIndex };
        const state = {
          ...initialState,
          dimensions: [{ values: [{}, { test: 'test', isRate: true }] }],
        };
        const expectedState = {
          ...initialState,
          dimensions: [
            {
              values: [
                {
                  isToggled: false,
                  isMapSelected: false,
                  isSelected: false,
                },
                {
                  test: 'test',
                  isToggled: true,
                  isMapSelected: true,
                  isSelected: true,
                  isRate: true,
                },
              ],
            },
          ],
          countryStale: true,
          mapStale: true,
        };
        expect(reducer(state, action)).toEqual(expectedState);
      });
    });

    it('should handle LOADING_STRUCTURE', () => {
      const action = { type: LOADING_STRUCTURE };
      const expectedState = { ...initialState, isLoadingStructure: true };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    describe('STRUCTURE_LOADED', () => {
      it('should match', () => {
        const dimensions = undefined;
        const action = { type: STRUCTURE_LOADED, dimensions };
        const expectedState = { ...initialState, isLoadingStructure: false, dimensions: [] };
        expect(reducer(initialState, action)).toEqual(expectedState);
      });

      it('should match', () => {
        const dimensions = 'dimensions';
        const action = { type: STRUCTURE_LOADED, dimensions };
        const expectedState = { ...initialState, isLoadingStructure: false, dimensions };
        expect(reducer(initialState, action)).toEqual(expectedState);
      });
    });

    it('should handle LOADING_DATA', () => {
      const action = { type: LOADING_DATA };
      const expectedState = { ...initialState, isLoadingData: true };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    describe('DATA_LOADED', () => {
      it('should match', () => {
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

      it('should match', () => {
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
    });

    describe('TOGGLE_ACTIVE_TYPE', () => {
      it('should match', () => {
        const activeType = 'active-type';
        const action = { type: TOGGLE_ACTIVE_TYPE, activeType };
        const state = { ...initialState, activeTypes: { [activeType]: true } };
        const expectedState = { ...initialState, activeTypes: { [activeType]: false } };
        expect(reducer(state, action)).toEqual(expectedState);
      });

      it('should match', () => {
        const activeType = 'active-type';
        const action = { type: TOGGLE_ACTIVE_TYPE, activeType };
        const expectedState = { ...initialState, activeTypes: { [activeType]: true } };
        expect(reducer(initialState, action)).toEqual(expectedState);
      });
    });
  });
});
