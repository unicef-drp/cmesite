import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import LanguageProvider from '../../LanguageProvider';
import configureStore from '../../../store/configureStore.dev';
import { enhance } from '../index';

describe('app | components | App | index', () => {
  describe('render', () => {
    it('should render', () => {
      const Component = () => <div />;
      const EnhancedComponent = enhance(Component);
      const state = { language: { locale: 'en' } };
      const store = configureStore(state, null);
      const history = createBrowserHistory();

      const wrapper = mount(
        <Provider store={store}>
          <LanguageProvider messages={{}}>
            <Router history={history}>
              <EnhancedComponent />
            </Router>
          </LanguageProvider>
        </Provider>,
      );

      expect(wrapper.find(Component).props()).toHaveProperty('intl');
      expect(wrapper.find(Component).props()).toHaveProperty('history');
    });
  });
});
