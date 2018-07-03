import 'sanitize.css/sanitize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import LanguageProvider from './components/LanguageProvider';
import App from './components/App';
import { translationMessages } from './i18n';
import configureStore from './store/configureStore';
import ducks from './ducks';
import wpApi from './api/wp';
import { getWPApiUrl } from './selectors/wp';
import loadConfig from './config';

loadConfig().then(config => {
  const store = configureStore(config);
  const history = createBrowserHistory();
  const ROOT = (
    <Provider store={store}>
      <LanguageProvider messages={translationMessages}>
        <Router history={history}>
          <App store={store} />
        </Router>
      </LanguageProvider>
    </Provider>
  );

  wpApi.config({ endpoint: getWPApiUrl(store.getState()) });
  ReactDOM.render(ROOT, document.getElementById('root'));
  store.dispatch(ducks.wp.actions.loadPosts());
});
