import { createMuiTheme } from '@material-ui/core/styles';
import { scaleOrdinal } from 'd3-scale';

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
    fontFamily: "'open sans', sans-serif",
    title: {
      fontFamily: "'montserrat', sans-serif",
      textTransform: 'uppercase',
      fontWeight: 600,
    },
    display1: {
      fontFamily: "'montserrat', sans-serif",
      fontWeight: 600,
    },
    headline: {
      fontFamily: "'montserrat', sans-serif",
      textTransform: 'uppercase',
      fontWeight: 600,
    },
    subheading: {
      fontWeight: 600,
      fontSize: 20,
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
    //http://tools.medialab.sciences-po.fr/iwanthue/
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
    mapOverColor: '#5f3d65', // over map color
  },
});
