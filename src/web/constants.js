export const REF_AREA = 'REF_AREA';
export const INDICATOR = 'INDICATOR';
export const SEX = 'SEX';
export const TIME_PERIOD = 'TIME_PERIOD';
export const REF_DATE = 'REF_DATE';
export const RELEVANT_DIMENSIONS = [REF_AREA, INDICATOR, SEX];
export const SEX_TOTAL_VALUE = '_T';
export const RELEVANT_DIMENSIONS_DEFAULTS = new Set(['MRY0T4', SEX_TOTAL_VALUE]);

export const EXC_NO_SEX_INDICATOR_VALUES = new Set(['MRM0', 'MRY5T14', 'TMM0', 'TMY5T14']);
export const EXC_RATE_INDICATOR_VALUE_REGEXP = /^((?!death).)*$/i;

export const ESTIMATE = 'ESTIMATE';
export const INCLUDED = 'IN';
export const EXCLUDED = 'EX';

export const OBS_STATUS = 'OBS_STATUS';
export const ESTIMATE_TYPE = { sdmxId: 'SERIES_NAME', sdmxValue: '269', id: ESTIMATE, value: true };
export const TYPES = [
  ESTIMATE_TYPE,
  { sdmxId: OBS_STATUS, sdmxValue: 'IN', id: INCLUDED, value: true },
  { sdmxId: OBS_STATUS, sdmxValue: 'EX', id: EXCLUDED, value: true },
];

export const Z = 'SERIES_NAME';
export const X = TIME_PERIOD;
export const Y0 = 'LOWER_BOUND';
export const Y1 = 'UPPER_BOUND';

export const MAX_SDMX_VALUES = 18;

export const SERIES_YEAR = 'SERIES_YEAR';
export const TOOLTIP_SERIES_KEYS = [Z, 'SERIES_CATEGORY', 'SERIES_TYPE', SERIES_YEAR];

export const EMAIL = 'childmortality@unicef.org';
export const LEGAL_LINK = 'https://www.unicef.org/about/legal.html';
export const LOCALES = ['en', 'fr', 'es'];
export const END_PERIOD = '2017-06'; // requires data availability to know boundaries of a time dimension

export const SERIES_METHOD = 'SERIES_METHOD';
export const DEFAULT_SYMBOL = 'circle';
export const MISC_SYMBOL = 'cross';
export const SERIES_METHOD_SYMBOLS = {
  FBH: 'circle',
  SBH: 'triangle',
  HD: 'diamond',
  VR: 'square',
};

export const LOGOS = {
  unicef: 'http://data.unicef.org',
  who: 'https://www.who.int',
  un: 'http://www.un.org/en/development/desa/population',
  wbo: 'http://www.worldbank.org',
};
