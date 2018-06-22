import { REQUEST_ERROR } from '../core';
import { loadPosts } from '../wp';
import { getError, hasError } from '../../selectors/core';
import configureStore from '../../store/configureStore.test';

jest.mock('../../api/wp', () => () =>
  Promise.reject({
    response: { data: { errorCode: 'CODE' }, status: 'STATUS' },
  }),
);

describe('server | ducks | core', () => {
  describe('check actions', () => {
    it('should request error', done => {
      const initialState = {};
      const hook = {
        [REQUEST_ERROR]: getState => {
          const state = getState();
          expect(hasError(state)).toBeTruthy();
          expect(getError(state)).toEqual({
            method: 'getPosts',
            errorCode: 'CODE',
            statusCode: 'STATUS',
          });
          done();
        },
      };
      const store = configureStore(initialState, hook);
      store.dispatch(loadPosts());
    });
  });
});
