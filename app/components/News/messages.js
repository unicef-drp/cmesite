import { defineMessages } from 'react-intl';

export const scope = 'components.News';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Updates',
  },
  action: {
    id: `${scope}.action`,
    defaultMessage: 'More news',
  },
});
