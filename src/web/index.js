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
import { scaleOrdinal, scaleQuantize } from 'd3-scale';
import { schemeSet1 } from 'd3-scale-chromatic';
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
    chartColorScale: scaleOrdinal(schemeSet1),
    /*chartColorScale: scaleOrdinal().range([
      //'#E6ED46', // hardly visible
      '#60C9E2',
      '#DE405C',
      '#6B3889',
    ]),*/
    mapColorScale: scaleQuantize()
      .domain([0, 100])
      .range(['#cdeaf6', '#9ad5ee', '#0095d6', '#0080b2', '#506897']), // ratio %
    mapAboveColor: '#002e49',
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
  sdmxApi.config(prop('sdmx')(config));
  ReactDOM.render(ROOT, document.getElementById('root'));
  store.dispatch(ducks.wp.actions.loadPosts('splashes'));
  store.dispatch(ducks.wp.actions.loadPosts('news'));
  store.dispatch(ducks.wp.actions.loadPosts('datasets'));
  store.dispatch(ducks.wp.actions.loadPosts('reports'));
  store.dispatch(ducks.wp.actions.loadPosts('focuses'));
  store.dispatch(ducks.wp.actions.loadPosts('abouts'));
  store.dispatch(ducks.wp.actions.loadPosts('methods'));
  store.dispatch(ducks.data.actions.loadStructure());
});
