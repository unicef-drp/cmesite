import { LOADING_POSTS, POSTS_LOADED } from '../wp';
import { loadPosts } from '../wp';
import configureStore from '../../store/configureStore.test';

jest.mock('../../api/wp', () => () => Promise.resolve({}));

describe('server | ducks | wp', () => {
  describe('check actions', () => {
    it('should start loading posts', done => {
      const initialState = {};
      const hook = {
        [LOADING_POSTS]: getState => {
          const state = getState();
          done();
        },
      };
      const store = configureStore(initialState, hook);
      store.dispatch(loadPosts());
    });

    it('should get posts', done => {
      const initialState = {};
      const hook = {
        [POSTS_LOADED]: getState => {
          const state = getState();
          done();
        },
      };
      const store = configureStore(initialState, hook);
      store.dispatch(loadPosts());
    });
  });
});
