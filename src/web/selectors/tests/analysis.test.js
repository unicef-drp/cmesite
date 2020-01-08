import { getActiveTab } from '../analysis';

describe('analysis', () => {
  describe('selectors', () => {
    it('should get activeTab', () => {
      const activeTab = 3;
      const state = { analysis: { activeTab } };
      expect(getActiveTab(state)).toEqual(activeTab);
    });
  });
});
