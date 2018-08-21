import { init } from 'ramda';
import { getPosts, getPostsByTag } from '../wp';

describe('web | selectors | wp', () => {
  const state = {
    wp: {
      apiUrl: 'apiUrl',
      posts: [
        { id: 1, tags: [1, 2] },
        { id: 2, tags: [1, 3] },
        { id: 3, tags: [2] },
      ],
    },
  };

  it('should getPosts', () => {
    const res = state.wp.posts;
    expect(getPosts(state)).toEqual(res);
  });
});
