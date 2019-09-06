export const REF_AREA = 'REF_AREA';
export const INDICATOR = 'INDICATOR';
export const SEX = 'SEX';
export const TIME_PERIOD = 'TIME_PERIOD';
export const REF_DATE = 'REF_DATE';
export const MODEL = 'MODEL';
export const RELEVANT_DIMENSIONS = [REF_AREA, INDICATOR, SEX];
export const SEX_TOTAL_VALUE = '_T';
export const RELEVANT_DIMENSIONS_DEFAULTS = new Set(['AFG', 'MRY0T4', SEX_TOTAL_VALUE]);

export const EXCLUDED_DOWNLOAD_DIMENSIONS = [TIME_PERIOD];

export const EXC_NO_SEX_INDICATOR_VALUES = new Set(['MRM0', 'MRY5T14', 'TMM0', 'TMY5T14']);
export const EXC_RATE_INDICATOR_VALUE_REGEXP = /^((?!death).)*$/i;

export const HIERARCHY_LABEL_TOKEN = ' > ';

export const ESTIMATE = 'ESTIMATE';
export const INCLUDED = 'IN';
export const EXCLUDED = 'EX';
export const PREVIOUS_ESTIMATE = 'PREVIOUS_ESTIMATE';

export const SERIES_NAME = 'SERIES_NAME';
export const OBS_STATUS = 'OBS_STATUS';
export const ESTIMATE_TYPE = {
  sdmxId: SERIES_NAME,
  sdmxValue: 'UN_IGME_2019',
  id: ESTIMATE,
  value: true,
};
export const TYPES = [
  ESTIMATE_TYPE,
  { sdmxId: OBS_STATUS, sdmxValue: 'IN', id: INCLUDED, value: true },
  { sdmxId: OBS_STATUS, sdmxValue: 'EX', id: EXCLUDED, value: true },
  { sdmxId: SERIES_NAME, sdmxValue: null, id: PREVIOUS_ESTIMATE },
];

export const Z = SERIES_NAME;
export const X = TIME_PERIOD;
export const Y0 = 'LOWER_BOUND';
export const Y1 = 'UPPER_BOUND';

export const MAX_SDMX_VALUES = 18;

export const SERIES_YEAR = 'SERIES_YEAR';
export const TOOLTIP_SERIES_KEYS = [Z, 'SERIES_CATEGORY', 'SERIES_TYPE', SERIES_YEAR];

export const EMAIL = 'childmortality@unicef.org';
export const LEGAL_LINK = 'https://www.unicef.org/about/legal.html';
export const LOCALES = ['en', 'fr', 'es', 'ru', 'ar'];
export const END_PERIOD = '2017-06'; // requires data availability to know boundaries of a time dimension

export const UNIT_MEASURE = 'UNIT_MEASURE';
export const SERIES_METHOD = 'SERIES_METHOD';
export const DEFAULT_SYMBOL = 'circle';
export const MISC_SYMBOL = 'cross';
export const SERIES_METHOD_SYMBOLS = {
  FBH: 'triangle',
  SBH: 'circle',
  HD: 'square',
  VR: 'diamond',
};

export const LOGOS = {
  unicef: 'http://data.unicef.org',
  who: 'https://www.who.int',
  un: 'http://www.un.org/en/development/desa/population',
  wbo: 'http://www.worldbank.org',
};

export const SERIES_CATEGORY = 'SERIES_CATEGORY';
export const SERIES_TYPE = 'SERIES_TYPE';
export const AGE_GROUP_OF_WOMEN = 'AGE_GROUP_OF_WOMEN';
export const TIME_SINCE_FIRST_BIRTH = 'TIME_SINCE_FIRST_BIRTH';
export const INTERVAL = 'INTERVAL';
export const STD_ERR = 'STD_ERR';
export const OBS_VALUE = 'OBS_VALUE';
export const EXPORT_INDEX_IDS = [
  REF_AREA,
  INDICATOR,
  SEX,
  SERIES_NAME,
  SERIES_CATEGORY,
  SERIES_METHOD,
  SERIES_TYPE,
  AGE_GROUP_OF_WOMEN,
  TIME_SINCE_FIRST_BIRTH,
  SERIES_YEAR,
  OBS_STATUS,
  INTERVAL,
  REF_DATE,
  OBS_VALUE,
  STD_ERR,
  UNIT_MEASURE,
  Y0,
  Y1,
];

export const DATASET_TYPES = ['estimates', 'sourcedata', 'methods'];

/*
 * the map (and its legend) depends on the displayed indicator.
 * INDICATOR_MAP_SCALES is an object where keys are indicator value ids
 * and values are an object of domains and ranges with options
 * where:
 * - domains should be integer array compliant with d3.scaleThreshold.domain
 * - ranges should be integer array compliant with d3.scaleThreshold.range
 * the only option is 'andAbove' to indicate if the domain is finite.
 *
 * range spec: [noData, ... domain intervals]
 * no data color: '#9b9b9b'
 * color pool: '#a1d4eb','#8abbd6 ','#72a2c0','#5b89ab','#447096','#2c5780','#153e6b','#21344a',
 */
export const MAP_DEFAULT_SCALE = {
  domain: [0, 5, 10, 20, 30, 40, 100, 150],
  range: [
    '#9b9b9b',
    '#a1d4eb',
    '#8abbd6 ',
    '#72a2c0',
    '#5b89ab',
    '#447096',
    '#2c5780',
    '#153e6b',
    '#21344a',
  ],
};
const MAP_NO_DATA = '#9b9b9b';
export const INDICATOR_MAP_SCALES = {
  MRY0T4: {
    domain: [0, 10, 20, 30, 40, 50],
    range: [MAP_NO_DATA, '#a1d4eb', '#8abbd6 ', '#72a2c0', '#5b89ab', '#447096', '#2c5780'],
    andAbove: true,
  },
  MRY5T14: {
    domain: [0, 10, 20, 50, 100],
    range: [MAP_NO_DATA, '#a1d4eb', '#8abbd6 ', '#72a2c0', '#5b89ab', '#447096'],
  },
};

export const ENHANCED_ESTIMATES_FIELDS = {
  year: 'Year',
  estimate: 'Estimate',
  lowerBound: 'Lower bound',
  upperBound: 'Upper bound',
};
export const ENHANCED_DATASOURCES_FIELDS = {
  name: 'Name',
  category: 'Category',
  method: 'Method',
  aowTsfb: 'AoW.TSFB',
  interval: 'Int.',
  refDate: 'Ref.date',
  value: 'Value',
  stdErr: 'Std.err',
  obsStatus: 'Obs.status',
};
