import { getLanguage } from '../language';

describe('web | selectors | language', () => {
  const state = {
    language: {
      locale: 'local',
    },
  };
  describe('getLanguage', () => {
    it('should get language', () => {
      const res = state.language;
      expect(getLanguage(state)).toEqual(res);
    });
  });
});
