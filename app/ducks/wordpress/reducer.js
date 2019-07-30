import produce from 'immer';
import { LOAD_POSTS, LOAD_POSTS_SUCCESS, LOAD_POSTS_ERROR } from './constants';

const fakePost = id => ({
  id,
  content: { rendered: "<strong>bold</strong>" },
  title: { rendered: "<em>italic</em>" },
  acf: {
    image: {
      url: 'https://childmortality.org/wp-content/uploads/2019/02/photo_about-1_compr.jpg',
      alt: 'image',
    },
  },
});
const fakePosts = [fakePost(1), fakePost(2)];

export const initialState = {
  abouts: {loading: false, error: false, posts: fakePosts},
  focuses: {loading: false, error: false, posts: fakePosts},
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
