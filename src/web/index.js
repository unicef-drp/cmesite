import React from 'react';
import ReactDOM from 'react-dom';
import { prop } from 'ramda';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'typeface-montserrat';
import 'typeface-open-sans';
import { scaleOrdinal } from 'd3-scale';
import LanguageProvider from './components/LanguageProvider';
import ConfigContext from './components/ConfigContext';
import App from './components/App';
import { translationMessages } from './i18n';
import configureStore from './store/configureStore';
import ducks from './ducks';
import wpApi from './api/wp';
import sdmxApi from './api/sdmx';
import loadConfig from './config';

const theme = createMuiTheme({
  typography: {
    fontFamily: "'open sans'",
    title: {
      fontFamily: "'montserrat'",
    },
    headline: {
      fontFamily: "'montserrat'",
      textTransform: 'uppercase',
      fontWeight: 400,
    },
  },
  palette: {
    primary: {
      light: '#E1ECF8',
      main: '#3282DA',
      dark: '#0B3B57',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fff',
      main: '#fff',
      dark: '#DEDEDF',
      contrastText: '#0B3B57',
    },
    chartColorScale: scaleOrdinal().range([
      //'#E6ED46',
      '#60C9E2',
      '#DE405C',
      '#6B3889',
    ]),
  },
});

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
  store.dispatch(ducks.wp.actions.loadTags());
  store.dispatch(ducks.wp.actions.loadPosts());
  store.dispatch(ducks.data.actions.loadStructure());
});
