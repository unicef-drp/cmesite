import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from '../../../store/configureStore.dev';
import { enhance } from '../index';
import ConfigContext from '../../../components/ConfigContext';

describe('app | components | LanguageProvider | index', () => {
  describe('render', () => {
    it.skip('should render', () => {
      const Component = () => <div />;
      const EnhancedComponent = enhance(Component);
      const config = { language: { locale: 'en' } };
      const store = configureStore({}, null);

      const wrapper = mount(
        <ConfigContext.Provider value={config}>
          <Provider store={store}>
            <EnhancedComponent />
          </Provider>
        </ConfigContext.Provider>,
      );

      expect(wrapper.find(Component).props().locale).toEqual(
        config.language.locale,
      );
    });
  });
});
