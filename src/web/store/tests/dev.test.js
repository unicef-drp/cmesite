import configureStore from '../configureStore.dev';

describe('app | store | configureStore', () => {
  describe('dev', () => {
    it('should', () => {
      const store = configureStore({});
      store.dispatch({ type: 'TEST' });
    });
  });
});
