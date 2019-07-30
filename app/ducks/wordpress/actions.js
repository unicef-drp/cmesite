import { LOAD_POSTS, LOAD_POSTS_SUCCESS, LOAD_POSTS_ERROR } from './constants';

export const loadPosts = postType => ({
  type: LOAD_POSTS,
  postType,
});

export const loadPostsSuccess = (postType, posts) => ({
  type: LOAD_POSTS_SUCCESS,
  postType,
  posts,
});

export const loadPostsError = (postType, error) => ({
  type: LOAD_POSTS_ERROR,
  postType,
  error,
});
