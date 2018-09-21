import sdmxStructure from '../../../../mock/data/sdmxStructure';
import { structureParser } from '../';

const dimensionIds = ['REF_AREA', 'INDICATOR', 'SEX'];
const dimensions = [
  {
    id: 'REF_AREA',
    index: 0,
    position: 1,
    label: 'Reference Area',
    values: [
      { id: '830', label: 'Channel Islands' },
      { id: '530', label: 'Netherlands Antilles [former]' },
      { id: 'ABW', label: 'Aruba' },
      { id: 'AFG', label: 'Afghanistan' },
    ],
  },
  {
    id: 'INDICATOR',
    index: 1,
    position: 2,
    label: 'Indicator',
    values: [
      { id: 'MRY0T4', label: 'Mortality Rate Under 5 Years Old' },
      { id: 'MRY5T14', label: 'Mortality Rate 5 to 14 Years Old' },
      { id: 'MRM0', label: 'Mortality Rate 0 to 28 Days Old' },
    ],
  },
  {
    id: 'SEX',
    index: 2,
    position: 3,
    label: 'Sex',
    values: [
      { id: 'F', label: 'Female' },
      { id: 'M', label: 'Male' },
      { id: '_T', label: 'Total' },
    ],
  },
  { id: 'SERIES_NAME', index: 3, position: 4 },
  { id: 'SERIES_YEAR', index: 4, position: 5 },
  { id: 'TIME_PERIOD', index: 5, position: 6 },
];

describe('lib', () => {
  describe('sdmx', () => {
    describe('structure', () => {
      it.only('should parse sdmx structure into dimensions', () => {
        expect(
          structureParser({ locale: 'en', dimensionIds })(sdmxStructure),
        ).toEqual(dimensions);
      });
    });
  });
});
