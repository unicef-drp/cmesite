import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from '../../../store/configureStore.dev';
import { enhance } from '../index';

describe('app | pages | LandingPage | index', () => {
  describe('render', () => {
    it('should find posts property in component', () => {
      const Component = () => <div />;
      const EnhancedComponent = enhance(Component);
      const posts = 'POSTS';
      const store = configureStore({ wp: { posts } }, null);
      const expectedProperty = 'posts';

      const wrapper = mount(
        <Provider store={store}>
          <EnhancedComponent />
        </Provider>,
      );

      expect(wrapper.find(Component).props().posts).toEqual(posts);
    });
  });
});
