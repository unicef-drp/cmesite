import produce from 'immer';
import { LOAD_POSTS, LOAD_POSTS_SUCCESS, LOAD_POSTS_ERROR } from './constants';

export const initialState = {
  reports: { loading: false, error: false, posts: [] },
  abouts: { loading: false, error: false, posts: [] },
  focuses: { loading: false, error: false, posts: [] },
  methods: { loading: false, error: false, posts: [] },
  splashes: { loading: false, error: false, posts: [] },
  news: { loading: false, error: false, posts: [] },
  datasets: { loading: false, error: false, posts: [] },
};

/* eslint-disable default-case, no-param-reassign */
const wordpressReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_POSTS:
        draft[action.postType].loading = true;
        draft[action.postType].error = false;
        draft[action.postType].posts = [];
        break;

      case LOAD_POSTS_SUCCESS:
        draft[action.postType].loading = false;
        draft[action.postType].error = false;
        draft[action.postType].posts = action.posts;
        break;

      case LOAD_POSTS_ERROR:
        draft[action.postType].loading = false;
        draft[action.postType].error = action.error;
        break;
    }
  });

export default wordpressReducer;
