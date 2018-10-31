export const REF_AREA = 'REF_AREA';
export const INDICATOR = 'INDICATOR';
export const SEX = 'SEX';
export const RELEVANT_DIMENSIONS = [REF_AREA, INDICATOR, SEX];

export const ESTIMATE = 'ESTIMATE';
export const INCLUDED = 'INCLUDED';
export const EXCLUDED = 'EXCLUDED';

export const TYPES = [
  { sdmxId: 'SERIES_NAME', sdmxValue: '269', id: ESTIMATE, value: true },
  { sdmxId: 'OBS_STATUS', sdmxValue: 'IN', id: INCLUDED, value: true },
  { sdmxId: 'OBS_STATUS', sdmxValue: 'EX', id: EXCLUDED, value: false },
];

export const Z = 'SERIES_NAME';
export const X = 'TIME_PERIOD';
export const Y0 = 'LOWER_BOUND';
export const Y1 = 'UPPER_BOUND';