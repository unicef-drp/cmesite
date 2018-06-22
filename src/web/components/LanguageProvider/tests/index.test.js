import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from '../../../store/configureStore.dev';
import { enhance } from '../index';

describe('app | components | LanguageProvider | index', () => {
  describe('render', () => {
    it('should render', () => {
      const Component = () => <div />;
      const EnhancedComponent = enhance(Component);
      const state = { language: { locale: 'en' } };
      const store = configureStore(state, null);

      const wrapper = mount(
        <Provider store={store}>
          <EnhancedComponent />
        </Provider>,
      );

      expect(wrapper.find(Component).props().locale).toEqual(
        state.language.locale,
      );
    });
  });
});
