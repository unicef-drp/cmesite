jest.mock('../configureStore.dev', () => () => 'DEV');

describe('app | store | configureStore', () => {
  describe('dev', () => {
    it('should load dev store', () => {
      process.env.NODE_ENV = 'development';
      const configureStore = require('../configureStore');
      expect(configureStore()).toEqual('DEV');
    });
  });
});
