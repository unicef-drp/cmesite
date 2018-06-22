jest.mock('../configureStore.prod', () => () => 'PROD');

describe('app | store | configureStore', () => {
  describe('production', () => {
    it('should load production store', () => {
      process.env.NODE_ENV = 'production';
      const configureStore = require('../configureStore');
      expect(configureStore()).toEqual('PROD');
    });
  });
});
