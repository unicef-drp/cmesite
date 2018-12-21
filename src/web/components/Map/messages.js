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
});
