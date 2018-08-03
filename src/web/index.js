import 'sanitize.css/sanitize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import LanguageProvider from './components/LanguageProvider';
import ConfigContext from './components/ConfigContext';
import App from './components/App';
import { translationMessages } from './i18n';
import configureStore from './store/configureStore';
import ducks from './ducks';
import wpApi from './api/wp';
import loadConfig from './config';

// https://material.io/tools/color/#!/?view.left=0&view.right=1&primary.color=0096FF&secondary.color=ffffff&primary.text.color=ffffff&secondary.text.color=0096ff
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#69c6ff',
      main: '#0096ff',
      dark: '#0069cb',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fff',
      main: '#fff',
      dark: '#ccc',
      contrastText: '#0069cb',
    },
  },
});

loadConfig().then(config => {
  const {
    wp: { endpoint },
  } = config;
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

  wpApi.config({ endpoint });
  ReactDOM.render(ROOT, document.getElementById('root'));
  store.dispatch(ducks.wp.actions.loadPosts());
});
