import { startRequest, endRequest, requestError } from './core';
import wpApi from '../api/wp';

export const LOADING_POSTS = 'CM/WP/LOADING_POSTS';
export const POSTS_LOADED = 'CM/WP/POSTS_LOADED';
export const LOADING_TAGS = 'CM/WP/LOADING_TAGS';
export const TAGS_LOADED = 'CM/WP/TAGS_LOADED';
export const types = { LOADING_POSTS, POSTS_LOADED, LOADING_TAGS, TAGS_LOADED };

const reducer = (state = {}, action = {}) => {
  switch (action.type) {
    case POSTS_LOADED:
      return { ...state, posts: action.posts };
    case TAGS_LOADED:
      return { ...state, tags: action.tags };
    default:
      return state;
  }
};

const requestWP = (dispatch, ctx, { errorCode } = {}) => {
  const { method } = ctx;
  dispatch(startRequest());
  return wpApi(ctx)
    .then(res => {
      dispatch(endRequest());
      return res;
    })
    .catch(err => {
      if (err.response) {
        const {
          data: { errorCode: resErrorCode },
          status,
        } = err.response;
        dispatch(
          requestError({
            method,
            errorCode: errorCode || resErrorCode,
            statusCode: status,
          }),
        );
      } else {
        dispatch(requestError({ method: ctx.method, errorCode }));
      }
      throw err;
    });
};

export const loadPosts = () => dispatch => {
  dispatch({ type: LOADING_POSTS });
  return requestWP(dispatch, { method: 'getPosts' }).then(posts =>
    dispatch({ type: POSTS_LOADED, posts }),
  );
};

export const loadTags = () => dispatch => {
  dispatch({ type: LOADING_TAGS });
  return requestWP(dispatch, { method: 'getTags' }).then(tags =>
    dispatch({ type: TAGS_LOADED, tags }),
  );
};

const actions = { loadPosts, loadTags };

export default { reducer, actions };
