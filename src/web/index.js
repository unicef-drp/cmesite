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
      contrastText: '#0B3B57',
    },
    chartColorScale: scaleOrdinal(schemeSet1),
    /*chartColorScale: scaleOrdinal().range([
      //'#E6ED46', // hardly visible
      '#60C9E2',
      '#DE405C',
      '#6B3889',
    ]),*/
    mapColorScale: scaleThreshold()
      .domain([0, 10, 20, 40, 100, 150])
      .range(['#9b9b9b', '#d4ebf6', '#a4d3f2', '#50b5e7', '#3596d1', '#006aa5', '#003f6f']),
    mapAboveColor: '#3282DA',
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

  sdmxApi.config({
    endpoint: 'https://dotstatdev.westeurope.cloudapp.azure.com/JulyDisseminateNSIService/rest',
    dataflow: {
      id: 'CME_DF',
      version: '1.0',
      agencyId: 'UNICEFDRPDAU',
    },
  });

  ReactDOM.render(ROOT, document.getElementById('root'));
  store.dispatch(ducks.wp.actions.loadPosts('splashes'));
  store.dispatch(ducks.wp.actions.loadPosts('news'));
  store.dispatch(ducks.wp.actions.loadPosts('datasets'));
  store.dispatch(ducks.wp.actions.loadPosts('reports'));
  store.dispatch(ducks.wp.actions.loadPosts('focuses'));
  store.dispatch(ducks.wp.actions.loadPosts('abouts'));
  store.dispatch(ducks.wp.actions.loadPosts('methods'));
});
