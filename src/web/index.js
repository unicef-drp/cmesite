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
import { scaleOrdinal, scaleThreshold } from 'd3-scale';
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
      textTransform: 'uppercase',
      fontWeight: 600,
    },
    display1: {
      fontFamily: "'montserrat'",
      fontWeight: 600,
    },
    headline: {
      fontFamily: "'montserrat'",
      textTransform: 'uppercase',
      fontWeight: 600,
    },
    subheading: {
      fontWeight: 600,
      fontSize: 20,
    },
  },
  palette: {
    primary: {
      light: '#d7e8f7',
      main: '#3282DA',
      dark: '#0B3B57',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fff',
      main: '#fff',
      dark: '#e2e9eb',
      darker: '#a9a9a9',
      contrastText: '#0B3B57',
    },
    chartColorScale: scaleOrdinal([
      '#3fb290',
      '#8b50ac',
      '#334355',
      '#e7ba00',
      '#d87219',
      '#d74334',
      '#d669ba',
      '#d11816',
    ]),
    mapColorScale: scaleThreshold()
      .domain([0, 10, 20, 40, 100, 150])
      .range(['#9b9b9b', '#a1d4eb', '#7bcef1', '#4fbaea', '#2b9cd7', '#006ba6', '#153e6b']),
    mapAboveColor: '#5f3d65',
    mapNoneColor: '#9b9b9b',
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
  //sdmxApi.config(prop('sdmx')(config));

  // staging and qa
  sdmxApi.config({
    endpoint: 'https://api.data.unicef.org/sdmx/Rest',
    dataflow: { id: 'CME_DF', version: '1.0', agencyId: 'UNICEF' },
  });

  ReactDOM.render(ROOT, document.getElementById('root'));
  store.dispatch(ducks.wp.actions.loadPosts('splashes'));
  store.dispatch(ducks.wp.actions.loadPosts('news'));
  store.dispatch(ducks.wp.actions.loadPosts('datasets'));
  store.dispatch(ducks.wp.actions.loadPosts('reports'));
  store.dispatch(ducks.wp.actions.loadPosts('focuses'));
  store.dispatch(ducks.wp.actions.loadPosts('abouts'));
  store.dispatch(ducks.wp.actions.loadPosts('methods'));
  store.dispatch(ducks.wp.actions.loadPosts('datanotes'));
});
