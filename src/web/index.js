import 'sanitize.css/sanitize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import LanguageProvider from './components/LanguageProvider';
import App from './components/App';
import { translationMessages } from './i18n';
import configureStore from './store/configureStore';

const initialState = {
  language: { locale: 'en' },
};
const store = configureStore(initialState);
const history = syncHistoryWithStore(createBrowserHistory(), store);
const ROOT = (
  <Provider store={store}>
    <LanguageProvider messages={translationMessages}>
      <Router history={history}>
        <App store={store} />
      </Router>
    </LanguageProvider>
  </Provider>
);

ReactDOM.render(ROOT, document.getElementById('root'));
