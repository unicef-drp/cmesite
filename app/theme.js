import { createMuiTheme } from '@material-ui/core/styles';
import { scaleOrdinal, scaleThreshold } from 'd3-scale';

export default createMuiTheme({
  overrides: {
    MuiTableCell: {
      paddingNone: {
        padding: 8,
      },
    },
    MuiTableHead: {
      root: {
        backgroundColor: '#e2e9eb',
        color: '#0B3B57',
      },
    },
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif",
    h6: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 600,
      textTransform: 'uppercase',
    },
    h4: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 600,
    },
    h5: {
      fontFamily: "'Montserrat', sans-serif",
      lineHeight: 1.35,
      fontWeight: 600,
      textTransform: 'uppercase',
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: 20,
      lineHeight: 1.5,
    },
    body2: {
      lineHeight: 1.75,
    },
  },
  palette: {
    background: {
      default: '#fff',
    },
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
    // http://tools.medialab.sciences-po.fr/iwanthue/
    chartColorScale: scaleOrdinal([
      '#8362d4',
      '#5cc151',
      '#c24fb6',
      '#a2b636',
      '#6c7ad1',
      '#d89a32',
      '#5d99d2',
      '#cf4b33',
      '#3fc1bf',
      '#d24078',
      '#4f8f39',
      '#855492',
      '#64c088',
      '#d68bc5',
      '#68752b',
      '#bb5c68',
      '#37835d',
      '#e18962',
      '#b7a961',
      '#95622a',
    ]),
    mapColorScale: scaleThreshold()
      .domain([0, 5, 10, 20, 30, 40, 100, 150])
      .range([
        '#9b9b9b',
        '#a1d4eb',
        '#8abbd6 ',
        '#72a2c0',
        '#5b89ab',
        '#447096',
        '#2c5780',
        '#153e6b',
        '#21344a',
      ]),
    mapAboveColor: '#5f3d65',
    mapNoneColor: '#9b9b9b',
  },
});
