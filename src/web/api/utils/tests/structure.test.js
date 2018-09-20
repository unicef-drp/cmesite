import sdmxStructure from '../../../../mock/data/sdmxStructure';
import structureParser from '../structure';

const dimensionIds = ['REF_AREA', 'INDICATOR', 'SEX'];
const dimensions = [
  {
    id: 'REF_AREA',
    index: 0,
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
    label: 'Sex',
    values: [
      { id: 'F', label: 'Female' },
      { id: 'M', label: 'Male' },
      { id: '_T', label: 'Total' },
    ],
  },
];

describe('api', () => {
  describe('utils', () => {
    describe('structure', () => {
      it.only('should parse sdmx structure into dimensions', () => {
        expect(structureParser({ dimensionIds })(sdmxStructure)).toEqual(
          dimensions,
        );
      });
    });
  });
});
