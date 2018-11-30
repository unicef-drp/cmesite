export const REF_AREA = 'REF_AREA';
export const INDICATOR = 'INDICATOR';
export const SEX = 'SEX';
export const TIME_PERIOD = 'TIME_PERIOD';
export const RELEVANT_DIMENSIONS = [REF_AREA, INDICATOR, SEX];
export const SEX_TOTAL_VALUE = '_T';
export const RELEVANT_DIMENSIONS_DEFAULTS = new Set(['MRY0T4', SEX_TOTAL_VALUE]);
export const EXC_NO_SEX_INDICATOR_VALUES = new Set(['MRY0T4']);
export const EXC_RATE_INDICATOR_VALUE_REGEXP = /rate/;

export const ESTIMATE = 'ESTIMATE';
export const INCLUDED = 'INCLUDED';
export const EXCLUDED = 'EXCLUDED';

export const ESTIMATE_TYPE = { sdmxId: 'SERIES_NAME', sdmxValue: '269', id: ESTIMATE, value: true };
export const TYPES = [
  ESTIMATE_TYPE,
  { sdmxId: 'OBS_STATUS', sdmxValue: 'IN', id: INCLUDED, value: true },
  { sdmxId: 'OBS_STATUS', sdmxValue: 'EX', id: EXCLUDED, value: true },
];

export const Z = 'SERIES_NAME';
export const X = TIME_PERIOD;
export const Y0 = 'LOWER_BOUND';
export const Y1 = 'UPPER_BOUND';

export const MAX_SDMX_VALUES = 18;

export const SERIES_METHOD = 'SERIES_METHOD';
export const TOOLTIP_SERIES_KEYS = [Z, 'SERIES_CATEGORY', 'SERIES_TYPE', 'SERIES_YEAR'];

export const EMAIL = 'childmortality@unicef.org';
export const LOCALES = ['en', 'fr', 'es'];
