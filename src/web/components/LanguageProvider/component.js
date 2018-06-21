import React from 'react';
import { string, object, element } from 'prop-types';
import { IntlProvider } from 'react-intl';

const propTypes = {
  locale: string,
  messages: object,
  children: element.isRequired,
};

const LanguageProvider = ({ messages, locale, children }) => {
  return (
    <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
      {React.Children.only(children)}
    </IntlProvider>
  );
};

LanguageProvider.propTypes = propTypes;

export default LanguageProvider;
