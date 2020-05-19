export const REF_AREA = 'REF_AREA';
export const INDICATOR = 'INDICATOR';
export const SEX = 'SEX';
export const TIME_PERIOD = 'TIME_PERIOD';
export const REF_DATE = 'REF_DATE';
export const MODEL = 'MODEL';
export const RELEVANT_DIMENSIONS = [REF_AREA, INDICATOR, SEX];
export const SEX_TOTAL_VALUE = '_T';
export const COUNTRY_DEFAULT_VALUE = 'AFG';
export const REGION_DEFAULT_VALUE = 'WORLD';
export const RELEVANT_DIMENSIONS_DEFAULTS = new Set([
  COUNTRY_DEFAULT_VALUE,
  'MRY0T4',
  SEX_TOTAL_VALUE,
]);

export const STILLBIRTH_INDICATOR_IDS = new Set(['SB', 'SBR']);
export const DISPARITY_INDICATOR_IDS = new Set(['D_MRY0T4', 'D_MRM0']);
export const PROGRESS_INDICATOR_IDS = new Set(['PR_MRY0T4', 'PR_MRM0']);

export const INDICATOR_IDS = {
  progress: new Set(['MRY0T4', 'MRM0', 'MRY5T14' /*, 'SBR'*/]),
  disparity: new Set(['MRY0T4', 'MRM0', 'MRY5T14' /*, 'SBR'*/]),
  sdg: new Set(['PR_MRY0T4', 'PR_MRM0']),
};

export const COUNTRY_NOTES = 'COUNTRY_NOTES';

export const EXCLUDED_DOWNLOAD_DIMENSIONS = [TIME_PERIOD];

export const EXC_NO_SEX_INDICATOR_VALUES = new Set([
  'MRM0',
  'MRY5T14',
  'TMM0',
  'TMY5T14',
  'SB',
  'SBR',
]);

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
export const TOOLTIP_SERIES_KEYS = [Z, 'SERIES_CATEGORY', 'SERIES_TYPE' /*, SERIES_YEAR*/];

export const EMAIL = 'childmortality@unicef.org';
export const LEGAL_LINK = 'https://www.unicef.org/about/legal.html';
export const LOCALES = ['en', 'fr', 'es', 'ru', 'ar'];

// requires data availability to know boundaries of a time dimension
export const DEFAULT_END_PERIOD = 2018;
export const END_PERIODS = {
  SBR: 2020,
  PR_MRY0T4: 2019,
  PR_MRM0: 2019,
};

// circle chart with time travel requires fixed boundaries
// it's assimilated as legend for map
export const DEFAULT_ANALYSIS_BOUNDARIES = [-1, 101];
export const ANALYSIS_BOUNDARIES = {
  MRY0T4: [-10, 310],
};

export const DEFAULT_ANALYSIS_TARGET = 25;
export const ANALYSIS_TARGETS = {
  MRM0: 12,
  MRY5T14: null,
  SBR: null,
};

export const UNIT_MEASURE = 'UNIT_MEASURE';
export const SERIES_METHOD = 'SERIES_METHOD';
export const DEFAULT_SYMBOL = 'circle';
export const MISC_SYMBOL = 'cross';
export const SERIES_METHOD_SYMBOLS = {
  FBH: 'triangle',
  SBH: 'circle',
  HD: 'square',
  VR: 'diamond',
  FPH: 'star',
  RC: 'octagon',
  HMIS: 'pentagon',
  PBS: 'triangleDown',
};

export const LOGOS = {
  unicef: 'http://data.unicef.org',
  who: 'https://www.who.int',
  un: 'http://www.un.org/en/development/desa/population',
  wbo: 'http://www.worldbank.org',
};

export const REPORT_TYPES = ['all', 'report', 'paper', 'software'];

export const SERIES_CATEGORY = 'SERIES_CATEGORY';
export const SERIES_TYPE = 'SERIES_TYPE';
export const AGE_GROUP_OF_WOMEN = 'AGE_GROUP_OF_WOMEN';
export const TIME_SINCE_FIRST_BIRTH = 'TIME_SINCE_FIRST_BIRTH';
export const INTERVAL = 'INTERVAL';
export const STD_ERR = 'STD_ERR';
export const OBS_VALUE = 'OBS_VALUE';
export const DEFINITION = 'DEFINITION';
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
    // Under-five mortality rate
    domain: [0, 12, 25, 40, 75, 100, 150],
    range: [
      MAP_NO_DATA,
      '#a1d4eb',
      '#8abbd6 ',
      '#72a2c0',
      '#5b89ab',
      '#447096',
      '#2c5780',
      '#153e6b',
    ],
    andAbove: true,
  },
  MRM0: {
    // Neonatal mortality rate
    domain: [0, 5, 15, 20, 30, 40, 50],
    range: [
      MAP_NO_DATA,
      '#a1d4eb',
      '#8abbd6 ',
      '#72a2c0',
      '#5b89ab',
      '#447096',
      '#2c5780',
      '#153e6b',
    ],
    andAbove: true,
  },
  MRY0: {
    // Infant mortality rate
    domain: [0, 5, 12, 25, 40, 75, 100],
    range: [
      MAP_NO_DATA,
      '#a1d4eb',
      '#8abbd6 ',
      '#72a2c0',
      '#5b89ab',
      '#447096',
      '#2c5780',
      '#153e6b',
    ],
    andAbove: true,
  },
  SBR: {
    // Stillbirth rate
    domain: [0, 5, 12, 20, 25, 30],
    range: [MAP_NO_DATA, '#a1d4eb', '#8abbd6 ', '#72a2c0', '#5b89ab', '#447096', '#2c5780'],
    andAbove: true,
  },
  MRY5T14: {
    // Mortality rate age 5 to 14
    domain: [0, 2, 5, 12, 20, 30, 50],
    range: [
      MAP_NO_DATA,
      '#a1d4eb',
      '#8abbd6 ',
      '#72a2c0',
      '#5b89ab',
      '#447096',
      '#2c5780',
      '#153e6b',
    ],
    andAbove: true,
  },
  MRY1T4: {
    // Child mortality rate age 1 to 4
    domain: [0, 5, 12, 20, 30, 50, 100],
    range: [
      MAP_NO_DATA,
      '#a1d4eb',
      '#8abbd6 ',
      '#72a2c0',
      '#5b89ab',
      '#447096',
      '#2c5780',
      '#153e6b',
    ],
    andAbove: true,
  },
};

export const CSV_DELIMITER = ',';
export const CSV_EOL = '\r\n';
export const CSV_DL_ESTIMATES_HEADERS = [
  `Estimates generated by the UN Inter-agency Group for Child Mortality Estimation (UN IGME) in 2019`,
  `Downloaded from: http://www.childmortality.org`,
  `Last update: 19 September 2019`, // date hardcoded because it's an official release from unicef
  `Note: Lower and Upper bounds refer to the 90 per cent uncertainty intervals for the estimates.`,
];
export const ENHANCED_ESTIMATES_FIELDS = {
  year: 'Year',
  estimate: 'Estimate',
  lowerBound: 'Lower bound',
  upperBound: 'Upper bound',
};
export const ENHANCED_DATASOURCES_FIELDS = {
  name: 'Series Name',
  category: 'Series Category',
  method: 'Data Collection Method',
  aowTsfb: 'Age of Women or Time since first Birth',
  interval: 'Interval',
  refDate: 'Reference Date',
  value: 'Value',
  stdErr: 'Standard Error',
  obsStatus: 'Used in Model',
};
export const OBS_STATUS_VALUES = { in: 'Included', ex: 'Excluded' };

export const INDICATOR_DEFINITIONS = {
  MRY0T4:
    'Under-five mortality rate (U5MR): the probability of dying between birth and exact age 5, expressed per 1,000 live births',
  MRY0:
    'Infant mortality rate (IMR): the probability of dying between birth and exact age 1, expressed per 1,000 live births',
  MRM0:
    'Neonatal mortality rate (NMR): the probability of dying within the first 28 days of life, expressed per 1,000 live births',
  MRY1T4:
    'Child mortality rate (CMR): the probability of dying between birth and exact age 1, expressed per 1,000 children aged 1 year',
  MRY5T14:
    'Mortality rate age 5-14 (10q5): the probability of dying between exact age 5 and exact age 15, expressed per 1,000 children aged 5',
  TMY0: 'Number of infant deaths',
  TMM0: 'Number of neonatal deaths',
  TMY0T4: 'Number of under-five deaths',
  TMY5T14: 'Number of deaths aged 5 to 14 years',
  TMY1T4: 'Number of deaths aged 1 to 4 years',
};

export const REGION = 'region';
export const COUNTRY = 'country';
export const VIZ_MAP = 'map';
export const VIZ_CIRCLE = 'circle';
export const VIZ_PACK = 'pack';
