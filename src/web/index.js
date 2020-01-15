import React from 'react';
import ReactDOM from 'react-dom';
import { prop } from 'ramda';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import LanguageProvider from './components/LanguageProvider';
import ConfigContext from './components/ConfigContext';
import App from './components/App';
import { translationMessages } from './i18n';
import configureStore from './store/configureStore';
import ducks from './ducks';
import wpApi from './api/wp';
import sdmxApi from './api/sdmx';
import loadConfig from './config';
import theme from './theme';

loadConfig().then(config => {
  const store = configureStore();
  const history = createBrowserHistory();
  const ROOT = (
    <ConfigContext.Provider value={config}>
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Router history={history}>
            <MuiThemeProvider theme={theme}>
              <CssBaseline />
              <App store={store} />
            </MuiThemeProvider>
          </Router>
        </LanguageProvider>
      </Provider>
    </ConfigContext.Provider>
  );

  wpApi.config(prop('wp')(config));
  sdmxApi.config(prop('sdmx')(config));

  ReactDOM.render(ROOT, document.getElementById('root'));
  /*store.dispatch(ducks.wp.actions.loadPosts('splashes'));
  store.dispatch(ducks.wp.actions.loadPosts('news'));
  store.dispatch(ducks.wp.actions.loadPosts('datasets'));
  store.dispatch(ducks.wp.actions.loadPosts('reports'));
  store.dispatch(ducks.wp.actions.loadPosts('focuses'));
  store.dispatch(ducks.wp.actions.loadPosts('abouts'));
  store.dispatch(ducks.wp.actions.loadPosts('methods'));
  store.dispatch(ducks.wp.actions.loadPosts('datanotes'));
  store.dispatch(ducks.wp.actions.loadPosts('downloads'));*/
});
