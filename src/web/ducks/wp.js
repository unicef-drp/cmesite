export const LOAD_POSTS = 'CM/WP/LOAD_POSTS';
export const POSTS_LOADED = 'CM/WP/POSTS_LOADED';
export const types = { LOAD_POSTS, POSTS_LOADED };

const reducer = (state = {}, action = {}) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const loadPosts = () => dispatch => {
  dispatch({ type: POSTS_LOADED });
};

const actions = {
  loadPosts,
};

export default { reducer, actions };
