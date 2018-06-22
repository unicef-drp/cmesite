import { getWPApiUrl, getPosts } from '../wp';

describe('web | selectors | wp', () => {
  const state = {
    wp: {
      apiUrl: 'apiUrl',
      posts: 'posts',
    },
  };

  it('should getWPApiUrl', () => {
    const res = state.wp.apiUrl;
    expect(getWPApiUrl(state)).toEqual(res);
  });

  it('should getPosts', () => {
    const res = state.wp.posts;
    expect(getPosts(state)).toEqual(res);
  });
});
