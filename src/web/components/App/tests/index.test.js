import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import ConfigContext from '../../ConfigContext';
import LanguageProvider from '../../LanguageProvider';
import configureStore from '../../../store/configureStore.dev';
import { enhance } from '../index';

describe('app | components | App | index', () => {
  describe('render', () => {
    it.skip('should render', () => {
      const Component = () => <div />;
      const EnhancedComponent = enhance(Component);
      const config = { language: { locale: 'en' } };
      const store = configureStore({}, null);
      const history = createBrowserHistory();

      const wrapper = mount(
        <ConfigContext.Provider value={config}>
          <Provider store={store}>
            <LanguageProvider messages={{}}>
              <Router history={history}>
                <EnhancedComponent />
              </Router>
            </LanguageProvider>
          </Provider>
        </ConfigContext.Provider>,
      );

      expect(wrapper.find(Component).props()).toHaveProperty('intl');
      expect(wrapper.find(Component).props()).toHaveProperty('history');
    });
  });
});
