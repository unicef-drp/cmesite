import { defineMessages } from 'react-intl';

export const scope = 'components.Datasets';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Global datasets',
  },
  subtitle: {
    id: `${scope}.subtitle`,
    defaultMessage: 'Last update - 18 September 2018',
  },
  updatedAt: {
    id: `${scope}.updatedAt`,
    defaultMessage: 'Last update',
  },
});
