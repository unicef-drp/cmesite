import configureStore from '../configureStore.prod';

describe('app | store | configureStore', () => {
  describe('dev', () => {
    it('should', () => {
      const store = configureStore({});
      store.dispatch({ type: 'TEST' });
    });
  });
});
