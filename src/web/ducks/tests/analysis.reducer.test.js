import duck, { CHANGE_ACTIVE_TAB } from '../analysis';

describe('analysis', () => {
  describe('duck', () => {
    const { reducer } = duck;
    const initialState = {
      activeTab: 0,
    };

    it('should return the initial state', () => {
      const action = {};
      const expectedState = initialState;
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle CHANGE_ACTIVE_TAB', () => {
      const activeTab = '3';
      const action = { type: CHANGE_ACTIVE_TAB, activeTab };
      const expectedState = { ...initialState, activeTab };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });
});
