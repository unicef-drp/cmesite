import { getGaIdByEnvironment } from '../../../components/App/index';

jest.mock('reselect', () => ({
  createSelector: jest.fn(() => jest.fn()),
  createStructuredSelector: jest.fn(() => jest.fn()),
}));

jest.mock('../../../selectors/global', () => ({
  hasTechnicalError: () => 'hasTechnicalError',
  getToken: () => 'getToken',
}));

jest.mock('../../../selectors/coreApi', () => ({
  getIsFetching: () => 'getIsFetching',
}));

describe('app | containers | App', () => {
  describe('getGaIdByEnvironment', () => {
    it('should return the  GA ID', () => {
      // given
      const prd = 'prd';
      const fakeSettings = { UNIVERSAL_ANALYTICS: 'prd' };
      // when
      const id = getGaIdByEnvironment(fakeSettings);

      // then
      expect(id).toEqual(prd);
    });
  });
});
