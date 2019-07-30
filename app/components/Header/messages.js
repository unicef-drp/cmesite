import { defineMessages } from 'react-intl';

export const scope = 'components.Header';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'UN Inter-agency Group for Child Mortality Estimation',
  },
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  data: {
    id: `${scope}.data`,
    defaultMessage: 'Data',
  },
  reports: {
    id: `${scope}.reports`,
    defaultMessage: 'Reports',
  },
  methods: {
    id: `${scope}.methods`,
    defaultMessage: 'Methods',
  },
  about: {
    id: `${scope}.about`,
    defaultMessage: 'About',
  },
});
