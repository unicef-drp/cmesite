import data, { types } from '../data';

describe('ducks', () => {
  describe('data', () => {
    const { reducer, actions } = data;
    const changeActiveTab = actions.changeActiveTab(1);
    const toggleDimensionValue = actions.toggleDimensionValue(0, 1);
    describe('actions', () => {
      it('should return changeActiveTab action', () => {
        const expectedAction = { type: types.CHANGE_ACTIVE_TAB, activeTab: 1 };
        expect(changeActiveTab).toEqual(expectedAction);
      });

      it('should return toggleDimensionValue action', () => {
        const expectedAction = {
          type: types.TOGGLE_DIMENSION_VALUE,
          dimensionIndex: 0,
          valueIndex: 1,
        };
        expect(toggleDimensionValue).toEqual(expectedAction);
      });
    });
    describe('reducer', () => {
      it('should return the initial state', () => {
        expect(reducer()).toEqual({
          activeTab: 0,
          isLoadingStructure: false,
          dimensions: [],
        });
      });
      it('should handle CHANGE_ACTIVE_TAB case', () => {
        expect(reducer({}, changeActiveTab)).toEqual({ activeTab: 1 });
      });
      it('should handle TOGGLE_DIMENSION_VALUE case', () => {
        const state = {
          dimensions: [
            {
              id: 'RATES',
              index: 0,
              label: 'Mortality rate',
              values: [
                { id: 'ufmr', label: 'Under-five mortality rate' },
                { id: 'imr', label: 'Infant mortality rate' },
              ],
            },
          ],
        };
        const extectedState = {
          dimensions: [
            {
              id: 'RATES',
              index: 0,
              label: 'Mortality rate',
              values: [
                { id: 'ufmr', label: 'Under-five mortality rate' },
                { id: 'imr', label: 'Infant mortality rate', isSelected: true },
              ],
            },
          ],
        };
        expect(reducer(state, toggleDimensionValue)).toEqual(extectedState);
      });
    });
  });
});
