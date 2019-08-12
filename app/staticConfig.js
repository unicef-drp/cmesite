import unicefLogo from './images/unicef-black-logo.jpg';
import whoLogo from './images/who-black-logo.png';
import unLogo from './images/un-black-logo.png';
import wboLogo from './images/wbo-black-logo.png';

import igmeLogo from './images/igme-logo.png';

export const EMAIL = 'childmortality@unicef.org';

export const LEGAL_LINK = 'https://www.unicef.org/about/legal.html';
export const LOGOS = [
  { id: 'unicef', href: 'http://data.unicef.org', img: unicefLogo },
  { id: 'who', href: 'https://www.who.int', img: whoLogo },
  { id: 'un', href: 'http://www.un.org/en/development/desa/population', img: unLogo },
  { id: 'wbo', href: 'http://www.worldbank.org', img: wboLogo },
];
export const IGME_LOGO = { img: igmeLogo, id: 'igme' };

export const LOCALES = ['en', 'fr', 'es', 'ru', 'ar'];

export const RELEVANT_DIMENSION_IDS = ['REF_AREA', 'INDICATOR', 'SEX'];
export const EXC_RATE_INDICATOR_VALUE_REGEXP = /^((?!death).)*$/i;

// params!
// export const wordpressEndpoint = 'https://childmortality.org/wp-json/wp/v2';
export const wordpressEndpoint = 'http://wordpress.qa.cme.redpelicans.com/wp-json/wp/v2';
export const sdmxEndpoint = 'https://api.data.unicef.org/sdmx/Rest';
export const sdmxDataflow = { agencyId: 'UNICEF', id: 'CME_DF', version: '1.0' };