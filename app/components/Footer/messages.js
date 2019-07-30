import { defineMessages } from 'react-intl';

export const scope = 'components.Footer';

export default defineMessages({
  about: {
    id: `${scope}.about`,
    defaultMessage: 'About UN IGME',
  },
  legal: {
    id: `${scope}.legal`,
    defaultMessage: 'Legal',
  },
  contact: {
    id: `${scope}.contact`,
    defaultMessage: 'Contact us',
  },
});
