import { defineMessages } from 'react-intl';

export default defineMessages({
  none: {
    id: 'map.legend.none',
    defaultMessage: 'No data',
  },
  max: {
    id: 'map.legend.max',
    defaultMessage: '{max} and above',
  },
  uncertainty: {
    id: 'map.datapoint.uncertainty',
    defaultMessage: 'Uncertainty Interval',
  },
  estimate: {
    id: 'map.datapoint.estimate',
    defaultMessage: 'est.',
  },
  resetZoom: {
    id: 'data.reset.zoom',
    defaultMessage: 'Reset zoom',
  },
  countryDetails: {
    id: 'data.country.details',
    defaultMessage: 'Click on the country to see details',
  },
  yta0: {
    id: 'year.to.achieve.0',
    defaultMessage: 'Already achieved',
  },
  yta1: {
    id: 'year.to.achieve.1',
    defaultMessage: 'On track to achieve',
  },
  yta2: {
    id: 'year.to.achieve.2',
    defaultMessage: 'Projected to achieve 2031-2050',
  },
  yta3: {
    id: 'year.to.achieve.3',
    defaultMessage: 'Projected to achieve after 2050',
  },
});
