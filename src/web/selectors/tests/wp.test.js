import { getPosts } from '../wp';

describe('web | selectors | wp', () => {
  const state = {
    wp: {
      apiUrl: 'apiUrl',
      posts: 'posts',
    },
  };

  it('should getPosts', () => {
    const res = state.wp.posts;
    expect(getPosts(state)).toEqual(res);
  });
});
