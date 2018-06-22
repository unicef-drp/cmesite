import { isFetching } from '../core';

describe('web | selectors | core', () => {
  const state = {
    core: {
      pendingRequests: 4,
    },
  };
  describe('isFetching', () => {
    it('should get isFetching', () => {
      const res = state.core.pendingRequests;
      expect(isFetching(state)).toEqual(res);
    });
  });
});
