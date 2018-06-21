import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export const Page2 = () => (
  <div>
    <FormattedMessage {...messages.welcome} />
  </div>
);

export default Page2;
