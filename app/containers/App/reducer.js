/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

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

import produce from 'immer';
import { LOAD_REPOS_SUCCESS, LOAD_REPOS, LOAD_REPOS_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },

  aboutPosts: fakePosts,
  focusPosts: fakePosts,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_REPOS:
        draft.loading = true;
        draft.error = false;
        draft.userData.repositories = false;
        break;

      case LOAD_REPOS_SUCCESS:
        draft.userData.repositories = action.repos;
        draft.loading = false;
        draft.currentUser = action.username;
        break;

      case LOAD_REPOS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default appReducer;
