import { startRequest, endRequest, requestError } from './core';
import wpApi from '../api/wp';

export const LOADING_POSTS = 'CM/WP/LOADING_POSTS';
export const POSTS_LOADED = 'CM/WP/POSTS_LOADED';
export const types = { LOADING_POSTS, POSTS_LOADED };

const reducer = (state = {}, action = {}) => {
  switch (action.type) {
    case POSTS_LOADED:
      return { ...state, [action.postType]: action.posts };
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

export const loadPosts = postType => dispatch => {
  dispatch({ type: LOADING_POSTS });
  return requestWP(dispatch, { method: 'getPosts', postType }).then(posts =>
    dispatch({ type: POSTS_LOADED, postType, posts }),
  );
};

const actions = { loadPosts };

export default { reducer, actions };
