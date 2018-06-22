import { START_REQUEST, END_REQUEST } from '../core';
import { loadPosts } from '../wp';
import { isFetching } from '../../selectors/core';
import configureStore from '../../store/configureStore.test';

jest.mock('../../api/wp', () => () => Promise.resolve({}));

describe('server | ducks | core', () => {
  describe('check actions', () => {
    it('should start request', done => {
      const initialState = {};
      const hook = {
        [START_REQUEST]: getState => {
          const state = getState();
          expect(isFetching(state)).toBeTruthy();
          done();
        },
      };
      const store = configureStore(initialState, hook);
      store.dispatch(loadPosts());
    });

    it('should end request', done => {
      const initialState = {};
      const hook = {
        [END_REQUEST]: getState => {
          const state = getState();
          expect(isFetching(state)).toBeFalsy();
          done();
        },
      };
      const store = configureStore(initialState, hook);
      store.dispatch(loadPosts());
    });
  });
});
