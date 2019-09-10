import ducks, { POSTS_LOADED } from '../wp';

describe('web/ducks/wp', () => {
  describe('wp reducer', () => {
    const { reducer } = ducks;
    const initialState = {
      foo: 'bar',
      test: { number: '42' },
    };
    describe('when called with an empty action', () => {
      it('should return the initial state', () => {
        const action = {};
        const expectedState = initialState;
        expect(reducer(initialState, action)).toEqual(expectedState);
      });
    });

    it('should handle POSTS_LOADED', () => {
      const postType = 'post-type';
      const posts = 'posts';
      const action = { type: POSTS_LOADED, postType, posts };
      const expectedState = { ...initialState, [postType]: posts };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });
});
