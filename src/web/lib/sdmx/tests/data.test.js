import dataParser, { dataQuery, toCsv, getEndPeriod } from '../data';
import {
  mockedDimensions1,
  mockedDimensions2,
  mockedDimensions3,
  mockedDimensions4,
  mockedDimensions5,
  mockedDimensions6,
  mockedDimensions7,
  mockedSdmxData1,
  mockedSdmxData2,
} from '../../../../mock/data/data';
import toCsvInputData from '../../../../mock/data/toCsvDataInput';
import toCsvInputData2 from '../../../../mock/data/toCsvDataInput2';
import toCsvInputData3 from '../../../../mock/data/toCsvDataInput3';

describe('/web/lib/sdmx/data', () => {
  describe('dataQuery', () => {
    describe('when called with a COUNTRY data context', () => {
      it('should match the expected result', () => {
        const expectedTitle = 'Under-5 mortality rate - Total';
        const queryOptions = {
          dropIds: ['TIME_PERIOD'],
          isExclusive: true,
          dimensionSeparator: ' - ',
          valueSeparator: ' ',
          key: 'label',
        };
        expect(dataQuery(queryOptions)(mockedDimensions1)).toMatch(expectedTitle);
      });

      it('should match the expected result', () => {
        const expectedTitle = 'Under-5 deaths - Total';
        const queryOptions = {
          dropIds: ['TIME_PERIOD'],
          isExclusive: true,
          dimensionSeparator: ' - ',
          valueSeparator: ' ',
          key: 'label',
        };
        expect(dataQuery(queryOptions)(mockedDimensions2)).toMatch(expectedTitle);
      });

      it('should match the expected result', () => {
        const expectedTitle = 'Under-5 deaths - Male';
        const queryOptions = {
          dropIds: ['TIME_PERIOD'],
          isExclusive: true,
          dimensionSeparator: ' - ',
          valueSeparator: ' ',
          key: 'label',
        };
        expect(dataQuery(queryOptions)(mockedDimensions3)).toMatch(expectedTitle);
      });
    });

    describe('when called with a COMPARE data context', () => {
      it('should match the expected result', () => {
        const expectedTitle = 'Afghanistan - Under-5 mortality rate - Total';
        const queryOptions = {
          dropIds: ['TIME_PERIOD'],
          onlyEstimates: true,
          dimensionSeparator: ' - ',
          valueSeparator: ' and ',
          key: 'label',
        };
        expect(dataQuery(queryOptions)(mockedDimensions4)).toMatch(expectedTitle);
      });

      it('should match the expected result', () => {
        const expectedTitle =
          'Jamaica and Namibia and Venezuela (Bolivarian Republic of) - Under-5 mortality rate and Neonatal mortality rate and Under-5 deaths and Neonatal deaths - Male and Total';
        const queryOptions = {
          dropIds: ['TIME_PERIOD'],
          onlyEstimates: true,
          dimensionSeparator: ' - ',
          valueSeparator: ' and ',
          key: 'label',
        };
        expect(dataQuery(queryOptions)(mockedDimensions5)).toMatch(expectedTitle);
      });
    });

    describe('when called with a MAP data context', () => {
      it('should match the expected result', () => {
        const expectedTitle = '.MRY0T4._T.UN_IGME_2019..';
        const queryOptions = {
          dropIds: ['REF_AREA'],
          isExclusive: true,
          onlyEstimates: true,
          onlyRates: true,
          isMap: true,
        };
        expect(dataQuery(queryOptions)(mockedDimensions6)).toMatch(expectedTitle);
      });
    });

    describe('when called with a DOWNLOAD data context', () => {
      it('should match the expected result', () => {
        const expectedTitle = 'AFG.MRY0T4._T...';
        const queryOptions = {
          dropIds: [],
        };
        expect(dataQuery(queryOptions)(mockedDimensions6)).toMatch(expectedTitle);
      });

      it('should match the expected result', () => {
        const expectedTitle = 'AFG+AND+ATG.MRY0T4+TMY0T4+TMY0+TMM0.M+_T...';
        const queryOptions = {
          dropIds: [],
        };
        expect(dataQuery(queryOptions)(mockedDimensions7)).toMatch(expectedTitle);
      });
    });
  });

  describe('dataParser', () => {
    describe('when called with a default data context', () => {
      it('should match the snapshot', () => {
        const parserOptions = {};
        const options = {
          locale: 'en',
          ...parserOptions,
        };
        expect(dataParser(options)(mockedSdmxData1)).toMatchSnapshot();
      });
    });
    describe('when called with a MAP data context', () => {
      it('should match the snapshot', () => {
        const parserOptions = { isMap: true };
        const options = {
          locale: 'en',
          ...parserOptions,
        };
        expect(dataParser(options)(mockedSdmxData2)).toMatchSnapshot();
      });
    });
  });

  describe('toCsv', () => {
    it('should match snapshot', () => {
      const options = { eol: '\r\n', delimiter: ',', excludedArtefactIds: ['TIME_PERIOD'] };
      expect(toCsv(options)(toCsvInputData)).toMatchSnapshot();
    });

    it('should match snapshot', () => {
      const options = { eol: '\r\n', delimiter: ',', excludedArtefactIds: ['TIME_PERIOD'] };
      expect(toCsv(options)(toCsvInputData2)).toMatchSnapshot();
    });

    it('should match snapshot', () => {
      const options = { eol: '\r\n', delimiter: ',', excludedArtefactIds: ['TIME_PERIOD'] };
      expect(toCsv(options)(toCsvInputData3)).toMatchSnapshot();
    });
  });

  describe('getEndPeriod', () => {
    it('should pass', () => {
      const dimensions1 = [
        {
          id: 'TEST',
          label: 'Test',
          values: [{ id: 'SBR', label: 'SBR', isToggled: true }],
        },
        {
          id: 'INDICATOR',
          label: 'Indicator',
          values: [{ id: 'MRY0T4', label: 'MRY0T4', isToggled: true }],
        },
      ];
      expect(getEndPeriod()(dimensions1)).toEqual(2018);

      const dimensions2 = [
        {
          id: 'TEST',
          label: 'Test',
          values: [{ id: 'MRY0T4', label: 'MRY0T4', isToggled: true }],
        },
        {
          id: 'INDICATOR',
          label: 'Indicator',
          values: [{ id: 'SBR', label: 'SBR', isToggled: true }],
        },
      ];
      expect(getEndPeriod()(dimensions2)).toEqual(2020);

      const dimensions3 = [
        {
          id: 'TEST',
          label: 'Test',
          values: [{ id: 'MRY0T4', label: 'MRY0T4', isToggled: true }],
        },
        {
          id: 'INDICATOR',
          label: 'Indicator',
          values: [
            { id: 'MRY0T4', label: 'MRY0T4', isToggled: true },
            { id: 'SBR', label: 'SBR', isToggled: true },
          ],
        },
      ];
      expect(getEndPeriod()(dimensions3)).toEqual(2020);
    });
  });
});
