import {
  getData,
  getHighlightedMethods,
  getActiveTab,
  getIsLoadingStructure,
  getIsLoadingData,
  getDownloadingData,
  getRawDimensions,
  getStale,
  getDimensions,
  getCountryDimension,
  getCountryDimensionWithAggregates,
  getIndicatorDimension,
  getRateIndicatorDimension,
  getSexDimension,
  getCountryValue,
  getIndicatorValue,
  getSexValue,
  getMapIndicatorValue,
  getIsExcNoSexIndicatorValue,
  getIsExcNoSexIndicatorValueByIndexes,
  getOtherDimensions,
  getDimensionsWithAggregates,
  getCountryTitle,
  getCompareTitle,
  getMapSeries,
  getMapIndex,
  getMapSerie,
  getRawCountrySeries,
  getCountryHasHighlights,
  getCountrySeries,
  getCountryActiveTypes,
  getCountryActiveSeries,
  getCountryEstimateSeries,
  getCountryIncludedSeries,
  getCountryExcludedSeries,
  getCountryOtherSeries,
  getCountryAllPreviousEstimateSeries,
  getCountryAllEstimateSeries,
  getCountryAllIncludedSeries,
  getCountryAllExcludedSeries,
  getCountryDatasourcesSerie,
  getEnhancedCountryAllEstimateSerie,
  getEnhancedCountryDatasourcesSerie,
  getCompareEstimateSeries,
  getCompareHasHighlights,
  getSeriesNames,
  getCountrySeriesUnit,
  getCanLoadData,
  getAnalysisIndicatorDimensionValues,
} from '../data';
import getCanLoadDataMapState from '../../../mock/data/getCanLoadDataMapState.json';
import getCanLoadDataCompareState from '../../../mock/data/getCanLoadDataCompareState.json';
import getCanLoadDataCountryState from '../../../mock/data/getCanLoadDataCountryState.json';

describe('/web/selectors/data', () => {
  describe('getData', () => {
    it('should obtain undefined when called with an empty state', () =>
      expect(getData(undefined)).toEqual(undefined));

    it('should obtain data when called with a filled state', () => {
      const data = 'data';
      const state = { data };
      expect(getData(state)).toEqual(data);
    });
  });

  describe('getHighlightedMethods', () => {
    it('should obtain undefined when called with an empty state', () =>
      expect(getHighlightedMethods(undefined)).toEqual(undefined));

    it('should obtain highlightedMethods when called with a filled state', () => {
      const highlightedMethods = 'highlightedMethods';
      const state = { data: { highlightedMethods } };
      expect(getHighlightedMethods(state)).toEqual(highlightedMethods);
    });
  });

  describe('getActiveTab', () => {
    it('should obtain undefined when called with an empty state', () =>
      expect(getActiveTab(undefined)).toEqual(undefined));

    it('should obtain activeTab when called with a filled state', () => {
      const activeTab = 'activeTab';
      const state = { data: { activeTab } };
      expect(getActiveTab(state)).toEqual(activeTab);
    });
  });

  describe('getIsLoadingStructure', () => {
    it('should obtain undefined when called with an empty state', () =>
      expect(getIsLoadingStructure(undefined)).toEqual(undefined));

    it('should obtain isLoadingStructure when called with a filled state', () => {
      const isLoadingStructure = 'isLoadingStructure';
      const state = { data: { isLoadingStructure } };
      expect(getIsLoadingStructure(state)).toEqual(isLoadingStructure);
    });
  });

  describe('getIsLoadingData', () => {
    it('should obtain undefined when called with an empty state', () =>
      expect(getIsLoadingData(undefined)).toEqual(undefined));

    it('should obtain isLoadingData when called with a filled state', () => {
      const isLoadingData = 'isLoadingData';
      const state = { data: { isLoadingData } };
      expect(getIsLoadingData(state)).toEqual(isLoadingData);
    });
  });

  describe('getDownloadingData', () => {
    it('should obtain undefined when called with an empty state', () =>
      expect(getDownloadingData(undefined)).toEqual(undefined));

    it('should obtain downloadingData when called with a filled state', () => {
      const downloadingData = 'downloadingData';
      const state = { data: { downloadingData } };
      expect(getDownloadingData(state)).toEqual(downloadingData);
    });
  });

  describe('getRawDimensions', () => {
    it('should obtain undefined when called with an empty state', () =>
      expect(getRawDimensions(undefined)).toEqual(undefined));

    it('should obtain dimensions when called with a filled state', () => {
      const dimensions = 'dimensions';
      const state = { data: { dimensions } };
      expect(getRawDimensions(state)).toEqual(dimensions);
    });
  });

  describe('getStale', () => {
    it('should obtain undefined when called with an empty state', () =>
      expect(getStale('dataType')(undefined)).toEqual(undefined));

    it('should obtain a prop constructed from dataType when called with a filled state', () => {
      const dataType = 'peep';
      const state = { data: { [`${dataType}Stale`]: 42 } };
      expect(getStale(dataType)(state)).toEqual(42);
    });
  });

  describe('getDimensions', () => {
    it('should throw an error when called with an empty state', () => {
      expect(() => getDimensions(undefined)).toThrow();
      expect(() => getDimensions({ data: { dimensions: undefined } })).toThrow();
    });

    it('should obtain an empty array when called with empty dimensions', () => {
      expect(getDimensions({ data: { dimensions: [] } })).toEqual([]);
    });

    it('should obtain a filtered version of dimensions based on RELEVANT_DIMENSIONS ids when called with a filled state', () => {
      const dimensions = [
        { id: 'bar' },
        { id: 'REF_AREA', test: 'test' },
        { foo: 'bar' },
        { id: 'INDICATOR' },
        667,
        { id: 'SEX' },
      ];
      const filteredDimensions = [
        { id: 'REF_AREA', test: 'test' },
        { id: 'INDICATOR' },
        { id: 'SEX' },
      ];
      const state = { data: { dimensions } };
      expect(getDimensions(state)).toEqual(filteredDimensions);
    });
  });

  describe('getCountryDimension', () => {
    it('should throw an error when called with an empty state', () =>
      expect(() => getCountryDimension(undefined)).toThrow());

    it('should obtain the first dimension with an id equal to REF_AREA when called with a filled state', () => {
      const dimensions = [
        { id: 'bar' },
        { id: 'REF_AREA', test: 'test' },
        { id: 'REF_AREA', foo: 'bar' },
        { foo: 'bar' },
        { id: 'INDICATOR' },
        667,
        { id: 'SEX' },
      ];
      const state = { data: { dimensions } };
      expect(getCountryDimension(state)).toEqual({ id: 'REF_AREA', test: 'test' });
    });
  });

  describe('getCountryDimensionWithAggregates', () => {
    const values = [
      { id: 'trap', label: 'traptrap' },
      { id: 'peep', label: 'lilpeep', test: 'test', parent: 'trap' },
      { id: 'foo', label: 'bar' },
    ];
    const dimensions = [{ id: 'REF_AREA', test: 'test', values }];
    const state = { data: { dimensions } };

    describe('when called with unformatted at true', () => {
      const unformatted = true;

      it('should throw an error when called with an empty state', () =>
        expect(() => getCountryDimensionWithAggregates(unformatted)(undefined)).toThrow());

      it('should obtain a parsed version of country dimension when called with a filled state', () => {
        expect(getCountryDimensionWithAggregates(unformatted)(state)).toEqual({
          id: 'REF_AREA',
          test: 'test',
          values: [
            {
              children: [
                { children: [], id: 'peep', label: 'lilpeep', parent: 'trap', test: 'test' },
              ],
              id: 'trap',
              label: 'traptrap',
            },
            { children: [], id: 'foo', label: 'bar' },
          ],
        });
      });
    });

    describe('when called with unformatted at false', () => {
      const unformatted = false;

      it('should throw an error when called with an empty state', () =>
        expect(() => getCountryDimensionWithAggregates(unformatted)(undefined)).toThrow());

      it('should obtain a parsed and formatted version of country dimension when called with a filled state', () => {
        expect(getCountryDimensionWithAggregates(unformatted)(state)).toEqual({
          id: 'REF_AREA',
          test: 'test',
          values: [
            { children: [], id: 'peep', label: 'traptrap > lilpeep', parent: 'trap', test: 'test' },
            { children: [], id: 'foo', label: 'bar' },
          ],
        });
      });
    });
  });

  describe('getIndicatorDimension', () => {
    it('should throw an error when called with an empty state', () =>
      expect(() => getIndicatorDimension(undefined)).toThrow());

    it('should obtain the first dimension with an id equal to INDICATOR when called with a filled state', () => {
      const dimensions = [
        { id: 'bar' },
        { id: 'INDICATOR', test: 'test' },
        { id: 'INDICATOR', foo: 'bar' },
        { foo: 'bar' },
        { id: 'REF_AREA' },
        667,
        { id: 'SEX' },
      ];
      const state = { data: { dimensions } };
      expect(getIndicatorDimension(state)).toEqual({ id: 'INDICATOR', test: 'test' });
    });
  });

  describe('getRateIndicatorDimension', () => {
    it('should throw an error when called with an empty state', () =>
      expect(() => getRateIndicatorDimension(undefined)).toThrow());

    it('should obtain undefined when called with a state that does not contain an INDICATOR dimension', () => {
      const dimensions = [
        { id: 'bar' },
        { id: 'REF_AREA', test: 'test' },
        { id: 'REF_AREA', foo: 'bar' },
        { foo: 'bar' },
        { id: 'REF_AREA' },
        667,
        { id: 'SEX' },
      ];
      const state = { data: { dimensions } };
      expect(getRateIndicatorDimension(state)).toBe(undefined);
    });

    it('should obtain a filtered version of indicator dimension based on isRate when called with a filled state', () => {
      const values = [
        { id: 'peep', isRate: true },
        { id: 'bar', isRate: false },
        { id: '667', isRate: true },
      ];
      const dimensions = [{ id: 'INDICATOR', test: 'test', values }];
      const state = { data: { dimensions } };
      expect(getRateIndicatorDimension(state)).toEqual({
        id: 'INDICATOR',
        test: 'test',
        values: [{ id: 'peep', isRate: true }, { id: '667', isRate: true }],
      });
    });
  });

  describe('getSexDimension', () => {
    it('should throw an error when called with an empty state', () =>
      expect(() => getSexDimension(undefined)).toThrow());

    it('should obtain the first dimension with an id equal to SEX when called with a filled state', () => {
      const dimensions = [
        { id: 'bar' },
        { id: 'SEX', test: 'test' },
        { id: 'SEX', foo: 'bar' },
        { foo: 'bar' },
        { id: 'REF_AREA' },
        667,
        { id: 'INDICATOR' },
      ];
      const state = { data: { dimensions } };
      expect(getSexDimension(state)).toEqual({ id: 'SEX', test: 'test' });
    });
  });

  describe('getCountryValue', () => {
    it('should throw an error when called with an empty state', () =>
      expect(() => getCountryValue(undefined)).toThrow());

    it('should obtain the first values element with isSelected at true when called with a filled state', () => {
      const values = [
        { id: 'peep', isSelected: false },
        { id: 'bar', isSelected: true },
        { id: '667', isSelected: true },
      ];
      const dimensions = [{ id: 'REF_AREA', test: 'test', values }];
      const state = { data: { dimensions } };
      expect(getCountryValue(state)).toEqual({ id: 'bar', isSelected: true });
    });
  });

  describe('getIndicatorValue', () => {
    it('should throw an error when called with an empty state', () =>
      expect(() => getIndicatorValue(undefined)).toThrow());

    it('should obtain the first values element with isSelected at true when called with a filled state', () => {
      const values = [
        { id: 'peep', isSelected: false },
        { id: 'bar', isSelected: true },
        { id: '667', isSelected: true },
      ];
      const dimensions = [{ id: 'INDICATOR', test: 'test', values }];
      const state = { data: { dimensions } };
      expect(getIndicatorValue(state)).toEqual({ id: 'bar', isSelected: true });
    });
  });

  describe('getSexValue', () => {
    it('should throw an error when called with an empty state', () =>
      expect(() => getSexValue(undefined)).toThrow());

    it('should obtain the first values element with isSelected at true when called with a filled state', () => {
      const values = [
        { id: 'peep', isSelected: false },
        { id: 'bar', isSelected: true },
        { id: '667', isSelected: true },
      ];
      const dimensions = [{ id: 'SEX', test: 'test', values }];
      const state = { data: { dimensions } };
      expect(getSexValue(state)).toEqual({ id: 'bar', isSelected: true });
    });
  });

  describe('getMapIndicatorValue', () => {
    it('should throw an error when called with an empty state', () =>
      expect(() => getMapIndicatorValue(undefined)).toThrow());

    it('should obtain the first isRate at true values element with isMapSelected at true when called with a filled state', () => {
      const values = [
        { id: 'peep', isRate: true, isMapSelected: false },
        { id: 'bar', isRate: false, isMapSelected: true },
        { id: '667', isRate: true, isMapSelected: true },
        { id: 'foo', isRate: true, isMapSelected: true },
      ];
      const dimensions = [{ id: 'INDICATOR', test: 'test', values }];
      const state = { data: { dimensions } };
      expect(getMapIndicatorValue(state)).toEqual({ id: '667', isMapSelected: true, isRate: true });
    });
  });

  describe('getIsExcNoSexIndicatorValue', () => {
    it('should throw an error when called with an empty state', () =>
      expect(() => getIsExcNoSexIndicatorValue(undefined)).toThrow());

    it('should obtain false when called with a non EXC_NO_SEX_INDICATOR_VALUES', () => {
      const NoExcNoSexIndicatorValue = '667';
      const values = [{ id: NoExcNoSexIndicatorValue, isSelected: true }];
      const dimensions = [{ id: 'INDICATOR', test: 'test', values }];
      const state = { data: { dimensions } };
      expect(getIsExcNoSexIndicatorValue(state)).toBeFalsy();
    });

    it('should obtain true when called with a EXC_NO_SEX_INDICATOR_VALUES', () => {
      const ExcNoSexIndicatorValue = 'MRM0';
      const values = [{ id: ExcNoSexIndicatorValue, isSelected: true }];
      const dimensions = [{ id: 'INDICATOR', test: 'test', values }];
      const state = { data: { dimensions } };
      expect(getIsExcNoSexIndicatorValue(state)).toBeTruthy();
    });
  });

  describe('getIsExcNoSexIndicatorValueByIndexes', () => {
    const NoExcNoSexIndicatorValue = '667';
    const ExcNoSexIndicatorValue = 'MRM0';
    const values = [
      { id: ExcNoSexIndicatorValue, isSelected: true },
      { id: NoExcNoSexIndicatorValue, isSelected: true },
    ];
    const dimensions = [{ id: 'foo' }, { id: 'bar', values }];
    const state = { data: { dimensions } };

    it('should obtain false when called with an empty state', () =>
      expect(getIsExcNoSexIndicatorValueByIndexes()(undefined)).toBeFalsy());

    it('should obtain false when called with irrelevant indexes', () => {
      const dimensionIndex = 12;
      const valueIndex = 15;
      expect(getIsExcNoSexIndicatorValueByIndexes(dimensionIndex, valueIndex)(state)).toBeFalsy();
    });

    it('should obtain true when called with a EXC_NO_SEX_INDICATOR_VALUES', () => {
      const dimensionIndex = 1;
      const valueIndex = 0;
      expect(getIsExcNoSexIndicatorValueByIndexes(dimensionIndex, valueIndex)(state)).toBeTruthy();
    });

    it('should obtain false when called with a EXC_NO_SEX_INDICATOR_VALUES', () => {
      const dimensionIndex = 1;
      const valueIndex = 1;
      expect(getIsExcNoSexIndicatorValueByIndexes(dimensionIndex, valueIndex)(state)).toBeFalsy();
    });
  });

  describe('getOtherDimensions', () => {
    it('should throw an error when called with an empty state', () =>
      expect(() => getOtherDimensions(undefined)).toThrow());

    it('should obtain INDICATOR and SEX dimensions when called with a filled state', () => {
      const dimensions = [
        { id: 'REF_AREA', test: 'test' },
        { id: 'INDICATOR', values: [] },
        { id: 'SEX' },
        { id: 'SEX', foo: 'bar' },
      ];
      const otherDimensions = [
        { id: 'INDICATOR', values: [] },
        { id: 'SEX' },
        { foo: 'bar', id: 'SEX' },
      ];
      const state = { data: { dimensions } };
      expect(getOtherDimensions(state)).toEqual(otherDimensions);
    });
  });

  describe('getDimensionsWithAggregates', () => {
    it('should throw an error when called with an empty state', () =>
      expect(() => getDimensionsWithAggregates(undefined)).toThrow());

    it('should obtain an array containing the country dimension with aggregates and other dimensions when called with a filled state', () => {
      const values = [
        { id: 'trap', label: 'traptrap' },
        { id: 'peep', label: 'lilpeep', test: 'test', parent: 'trap' },
        { id: 'foo', label: 'bar' },
      ];
      const dimensions = [
        { id: 'REF_AREA', test: 'test', values },
        { id: 'INDICATOR', values: [] },
        { id: 'SEX' },
        { id: 'SEX', foo: 'bar' },
      ];
      const state = { data: { dimensions } };
      expect(getDimensionsWithAggregates(state)).toEqual([
        {
          id: 'REF_AREA',
          test: 'test',
          values: [
            {
              children: [
                { children: [], id: 'peep', label: 'lilpeep', parent: 'trap', test: 'test' },
              ],
              id: 'trap',
              label: 'traptrap',
            },
            { children: [], id: 'foo', label: 'bar' },
          ],
        },
        { id: 'INDICATOR', values: [] },
        { id: 'SEX' },
        { foo: 'bar', id: 'SEX' },
      ]);
    });
  });

  describe('getCountryTitle', () => {
    it('should throw an error when called with an empty state', () =>
      expect(() => getCountryTitle(undefined)).toThrow());

    it('should obtain a title constructed from INDICATOR and SEX values when called with a filled state', () => {
      const countryValues = [{ id: 'bar', label: 'country', isSelected: true }];
      const indicatorValues = [{ id: 'trap', label: 'indicator', isSelected: true }];
      const sexValues = [{ id: 'foo', label: 'sex', isSelected: true }];
      const dimensions = [
        { id: 'REF_AREA', values: countryValues },
        { id: 'INDICATOR', values: indicatorValues },
        { id: 'SEX', values: sexValues },
      ];
      const state = { data: { dimensions } };
      expect(getCountryTitle(state)).toMatch('indicator - sex');
    });
  });

  describe('getCompareTitle', () => {
    it('should throw an error when called with an empty state', () =>
      expect(() => getCompareTitle(undefined)).toThrow());

    it('should obtain a title constructed from REF_AREA, INDICATOR and SEX values when called with a filled state', () => {
      const countryValues = [{ id: 'bar', label: 'country', isToggled: true }];
      const indicatorValues = [{ id: 'trap', label: 'indicator', isToggled: true }];
      const sexValues = [{ id: 'foo', label: 'sex', isToggled: true }];
      const dimensions = [
        { id: 'REF_AREA', values: countryValues },
        { id: 'INDICATOR', values: indicatorValues },
        { id: 'SEX', values: sexValues },
      ];
      const state = { data: { dimensions } };
      expect(getCompareTitle(state)).toMatch('country - indicator - sex');
    });
  });

  describe('getMapSeries', () => {
    it('should obtain an empty array when called with an empty state', () =>
      expect(getMapSeries(undefined)).toEqual([]));

    it('should obtain mapSeries values sorted by name when called with a filled state', () => {
      const mapSeries = {
        serie1: { name: 'b' },
        serie2: { name: 'c' },
        serie3: { name: 'a' },
      };
      const state = { data: { mapSeries } };
      const sortedSeries = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];
      expect(getMapSeries(state)).toEqual(sortedSeries);
    });
  });

  describe('getMapIndex', () => {
    it('should obtain -1 when called with an empty state', () =>
      expect(getMapIndex(undefined)).toBe(-1));

    it('should obtain mapIndex if it exists when called with a filled state', () => {
      const mapIndex = 'mapIndex';
      const state = { data: { mapIndex } };
      expect(getMapIndex(state)).toEqual(mapIndex);
    });

    it('should obtain mapSeries length -1 if mapIndex not exists when called with a filled state', () => {
      const mapIndex = null;
      const mapSeries = ['serie1', 'serie2', 'serie3'];
      const state = { data: { mapIndex, mapSeries } };
      expect(getMapIndex(state)).toBe(2);
    });
  });

  describe('getMapSerie', () => {
    it('should obtain undefined when called with an empty state', () =>
      expect(getMapSerie(undefined)).toBe(undefined));

    it('should obtain the last element of sorted mapSeries when called with a filled state', () => {
      const mapIndex = null;
      const mapSeries = {
        serie1: { name: 'b' },
        serie2: { name: 'c' },
        serie3: { name: 'a' },
      };
      const state = { data: { mapIndex, mapSeries } };
      expect(getMapSerie(state)).toEqual({ name: 'c' });
    });
  });

  describe('getRawCountrySeries', () => {
    it('should obtain an empty array when called with an empty state', () =>
      expect(getRawCountrySeries(undefined)).toEqual([]));

    it('should obtain countrySeries values when called with a filled state', () => {
      const countrySeries = {
        serie1: 'serie1',
        serie2: 'serie2',
        serie3: 'serie3',
      };
      const countrySeriesValues = ['serie1', 'serie2', 'serie3'];
      const state = { data: { countrySeries } };
      expect(getRawCountrySeries(state)).toEqual(countrySeriesValues);
    });
  });

  describe('getCountryHasHighlights', () => {
    it('should obtain false when called with an empty state', () =>
      expect(getCountryHasHighlights(undefined)).toBeFalsy());

    it('should obtain true when an element of countrySeries isHighlighted when called with a filled state', () => {
      const countrySeries = {
        serie1: 'serie1',
        serie2: { isHighlighted: true },
        serie3: 'serie3',
      };
      const state = { data: { countrySeries } };
      expect(getCountryHasHighlights(state)).toBeTruthy();
    });

    it('should obtain false when an element of countrySeries isHighlighted when called with a filled state', () => {
      const countrySeries = {
        serie1: 'serie1',
        serie2: 'serie2',
        serie3: 'serie3',
      };
      const state = { data: { countrySeries } };
      expect(getCountryHasHighlights(state)).toBeFalsy();
    });
  });

  describe('getCountrySeries', () => {
    it('should obtain an empty object when called with an empty state', () =>
      expect(getCountrySeries(undefined)).toEqual({}));

    it('should obtain grouped by type countrySeries values when called with a filled state', () => {
      const countrySeries = {
        serie1: { type: 'peep' },
        serie2: 'serie2',
        serie3: { type: 'bar' },
        serie4: { type: 'bar', test: 'test' },
      };
      const state = { data: { countrySeries } };
      const groupedCountrySeries = {
        bar: [{ type: 'bar' }, { test: 'test', type: 'bar' }],
        peep: [{ type: 'peep' }],
        undefined: ['serie2'],
      };
      expect(getCountrySeries(state)).toEqual(groupedCountrySeries);
    });
  });

  describe('getCountryActiveTypes', () => {
    it('should obtain an empty object when called with an empty state', () =>
      expect(getCountryActiveTypes(undefined)).toEqual({}));

    it('should obtain activeTypes from countrySeries keys when called with a filled state', () => {
      const countrySeries = {
        serie1: { type: 'peep' },
        serie2: 'serie2',
        serie3: { type: 'bar' },
        serie4: { type: 'bar', test: 'test' },
      };
      const activeTypes = { peep: 'peep', bar: 'bar' };
      const state = { data: { countrySeries, activeTypes } };
      expect(getCountryActiveTypes(state)).toEqual(activeTypes);
    });
  });

  describe('getCountryActiveSeries', () => {
    it('should obtain an empty object when called with an empty state', () =>
      expect(getCountryActiveSeries(undefined)).toEqual({}));

    it('should obtain countrySeries fields from activeTypes when called with a filled state', () => {
      const countrySeries = {
        serie1: { type: 'peep' },
        serie2: 'serie2',
        serie3: { type: 'bar' },
        serie4: { type: 'bar', test: 'test' },
      };
      const activeTypes = { peep: 'peep', bar: 'bar' };
      const state = { data: { countrySeries, activeTypes } };
      expect(getCountryActiveSeries(state)).toEqual({
        bar: [{ type: 'bar' }, { test: 'test', type: 'bar' }],
        peep: [{ type: 'peep' }],
      });
    });
  });

  describe('getCountryEstimateSeries', () => {
    it('should obtain undefined when called with an empty state', () =>
      expect(getCountryEstimateSeries(undefined)).toEqual(undefined));

    it('should obtain estimate series when called with a filled state', () => {
      const countrySeries = {
        serie1: { type: 'peep' },
        serie2: 'serie2',
        serie3: { type: 'bar' },
        serie4: { type: 'bar', test: 'test' },
        serie5: { type: 'ESTIMATE' },
        series: { type: 'ESTIMATE', foo: 'bar' },
      };
      const activeTypes = { peep: 'peep', bar: 'bar', ESTIMATE: 'estimate' };
      const state = { data: { countrySeries, activeTypes } };
      const estimateSeries = [{ type: 'ESTIMATE' }, { type: 'ESTIMATE', foo: 'bar' }];
      expect(getCountryEstimateSeries(state)).toEqual(estimateSeries);
    });
  });

  describe('getCountryIncludedSeries', () => {
    it('should obtain undefined when called with an empty state', () =>
      expect(getCountryIncludedSeries(undefined)).toEqual(undefined));

    it('should obtain included series when called with a filled state', () => {
      const countrySeries = {
        serie1: { type: 'peep' },
        serie2: 'serie2',
        serie3: { type: 'bar' },
        serie4: { type: 'bar', test: 'test' },
        serie5: { type: 'IN' },
        series: { type: 'IN', foo: 'bar' },
      };
      const activeTypes = { peep: 'peep', bar: 'bar', IN: 'included' };
      const state = { data: { countrySeries, activeTypes } };
      const includedSeries = [{ type: 'IN' }, { type: 'IN', foo: 'bar' }];
      expect(getCountryIncludedSeries(state)).toEqual(includedSeries);
    });
  });

  describe('getCountryExcludedSeries', () => {
    it('should obtain undefined when called with an empty state', () =>
      expect(getCountryExcludedSeries(undefined)).toEqual(undefined));

    it('should obtain excluded series when called with a filled state', () => {
      const countrySeries = {
        serie1: { type: 'peep' },
        serie2: 'serie2',
        serie3: { type: 'bar' },
        serie4: { type: 'bar', test: 'test' },
        serie5: { type: 'EX' },
        series: { type: 'EX', foo: 'bar' },
      };
      const activeTypes = { peep: 'peep', bar: 'bar', EX: 'excluded' };
      const state = { data: { countrySeries, activeTypes } };
      const excludedSeries = [{ type: 'EX' }, { type: 'EX', foo: 'bar' }];
      expect(getCountryExcludedSeries(state)).toEqual(excludedSeries);
    });
  });

  describe('getCountryOtherSeries', () => {
    it('should obtain an empty object when called with an empty state', () =>
      expect(getCountryOtherSeries(undefined)).toEqual({}));

    it('should obtain an empty object when called with a state that does not contain activeTypes when called with a filled state', () => {
      const countrySeries = {
        serie1: { type: 'peep' },
        serie2: 'serie2',
        serie3: { type: 'bar' },
        serie4: { type: 'bar', test: 'test' },
      };
      const activeTypes = {};
      const state = { data: { countrySeries, activeTypes } };
      expect(getCountryOtherSeries(state)).toEqual({});
    });

    it('should obtain an empty object when called with a state that does not contain country series with an activeType type when called with a filled state', () => {
      const countrySeries = {
        serie2: 'serie2',
      };
      const activeTypes = { peep: 'peep', bar: 'bar' };
      const state = { data: { countrySeries, activeTypes } };
      expect(getCountryOtherSeries(state)).toEqual({});
    });

    it('should obtain .. when called with a filled state', () => {
      const countrySeries = {
        serie1: { type: 'EX', name: 'foo' },
        serie2: 'serie2',
        serie3: { type: 'IN', name: 'bar', datapoints: [{ x: 12 }, { x: 1 }] },
        serie4: { type: 'EX', name: 'bar' },
        serie5: { type: 'peep' },
      };
      const activeTypes = { peep: 'peep', bar: 'bar', IN: 'INCLUDED' };
      const state = { data: { countrySeries, activeTypes } };
      expect(getCountryOtherSeries(state)).toEqual({
        EX: [],
        IN: [{ datapoints: [{ x: 1 }, { x: 12 }], name: 'bar', type: 'IN' }],
      });
    });

    it('should obtain .. when called with a filled state', () => {
      const countrySeries = {
        serie2: 'serie2',
        serie3: { type: 'IN', name: 'bar', datapoints: [{ x: 12 }, { x: 1 }] },
        serie4: { type: 'EX', name: 'bar', datapoints: [{ x: 42 }] },
        serie5: { type: 'peep' },
      };
      const activeTypes = { peep: 'peep', bar: 'bar', IN: 'INCLUDED', EX: 'excluded' };
      const state = { data: { countrySeries, activeTypes } };
      expect(getCountryOtherSeries(state)).toEqual({
        EX: [],
        IN: [{ datapoints: [{ x: 1 }, { x: 12 }, { x: 42 }], name: 'bar', type: 'IN' }],
      });
    });

    it('should obtain .. when called with a filled state', () => {
      const countrySeries = {
        serie2: 'serie2',
        serie3: { type: 'IN', name: 'bar', datapoints: [{ x: 12 }, { x: 1 }] },
        serie4: { type: 'EX', name: 'foo', datapoints: [{ x: 42 }] },
        serie5: { type: 'peep' },
      };
      const activeTypes = { peep: 'peep', bar: 'bar', IN: 'INCLUDED', EX: 'excluded' };
      const state = { data: { countrySeries, activeTypes } };
      expect(getCountryOtherSeries(state)).toEqual({
        EX: [{ datapoints: [{ x: 42 }], name: 'foo', type: 'EX' }],
        IN: [{ datapoints: [{ x: 1 }, { x: 12 }], name: 'bar', type: 'IN' }],
      });
    });

    it('should obtain .. when called with a filled state', () => {
      const countrySeries = {
        serie1: { type: 'IN', name: 'peep', datapoints: [] },
        serie2: 'serie2',
        serie3: { type: 'IN', name: 'bar', datapoints: [{ x: 12 }, { x: 1 }] },
        serie4: { type: 'EX', name: 'foo', datapoints: [{ x: 42 }] },
        serie4: { type: 'EX', name: 'bar', datapoints: [{ x: 41 }] },
        serie5: { type: 'peep' },
      };
      const activeTypes = { peep: 'peep', bar: 'bar', IN: 'INCLUDED', EX: 'excluded' };
      const state = { data: { countrySeries, activeTypes } };
      expect(getCountryOtherSeries(state)).toEqual({
        EX: [],
        IN: [
          { datapoints: [], name: 'peep', type: 'IN' },
          { datapoints: [{ x: 1 }, { x: 12 }, { x: 41 }], name: 'bar', type: 'IN' },
        ],
      });
    });
  });

  describe('getCountryAllPreviousEstimateSeries', () => {
    it('should obtain undefined when called with an empty state', () =>
      expect(getCountryAllPreviousEstimateSeries(undefined)).toEqual(undefined));

    it('should obtain previous estimate series when called with a filled state', () => {
      const countrySeries = {
        serie1: { type: 'peep' },
        serie2: 'serie2',
        serie3: { type: 'bar' },
        serie4: { type: 'bar', test: 'test' },
        serie5: { type: 'PREVIOUS_ESTIMATE' },
        serie6: { type: 'PREVIOUS_ESTIMATE', foo: 'bar' },
      };
      const state = { data: { countrySeries } };
      const previousEstimateSeries = [
        { type: 'PREVIOUS_ESTIMATE' },
        { type: 'PREVIOUS_ESTIMATE', foo: 'bar' },
      ];
      expect(getCountryAllPreviousEstimateSeries(state)).toEqual(previousEstimateSeries);
    });
  });

  describe('getCountryAllEstimateSeries', () => {
    it('should obtain undefined when called with an empty state', () =>
      expect(getCountryAllEstimateSeries(undefined)).toEqual(undefined));

    it('should obtain estimate series when called with a filled state', () => {
      const countrySeries = {
        serie1: { type: 'peep' },
        serie2: 'serie2',
        serie4: { type: 'bar', test: 'test' },
        serie5: { type: 'ESTIMATE' },
        serie6: { type: 'ESTIMATE', foo: 'bar' },
      };
      const state = { data: { countrySeries } };
      const estimateSeries = [{ type: 'ESTIMATE' }, { type: 'ESTIMATE', foo: 'bar' }];
      expect(getCountryAllEstimateSeries(state)).toEqual(estimateSeries);
    });
  });

  describe('getCountryAllIncludedSeries', () => {
    it('should obtain undefined when called with an empty state', () =>
      expect(getCountryAllIncludedSeries(undefined)).toEqual(undefined));

    it('should obtain included series when called with a filled state', () => {
      const countrySeries = {
        serie1: { type: 'peep' },
        serie2: 'serie2',
        serie4: { type: 'bar', test: 'test' },
        serie5: { type: 'IN' },
        serie6: { type: 'IN', foo: 'bar' },
      };
      const state = { data: { countrySeries } };
      const includedSeries = [{ type: 'IN' }, { type: 'IN', foo: 'bar' }];
      expect(getCountryAllIncludedSeries(state)).toEqual(includedSeries);
    });
  });

  describe('getCountryAllExcludedSeries', () => {
    it('should obtain undefined when called with an empty state', () =>
      expect(getCountryAllExcludedSeries(undefined)).toEqual(undefined));

    it('should obtain excluded series when called with a filled state', () => {
      const countrySeries = {
        serie1: { type: 'peep' },
        serie2: 'serie2',
        serie4: { type: 'bar', test: 'test' },
        serie5: { type: 'EX' },
        serie6: { type: 'EX', foo: 'bar' },
      };
      const state = { data: { countrySeries } };
      const excludedSeries = [{ type: 'EX' }, { type: 'EX', foo: 'bar' }];
      expect(getCountryAllExcludedSeries(state)).toEqual(excludedSeries);
    });
  });

  describe('getCountryDatasourcesSerie', () => {
    it('should obtain an empty array when called with an empty state', () =>
      expect(getCountryDatasourcesSerie(undefined)).toEqual([]));

    it('should obtain included and excluded datapoints sorted by REF_DATA and SERIES_NAME props when called with a filled state', () => {
      const countrySeries = {
        serie1: { type: 'peep' },
        serie2: 'serie2',
        serie3: {
          type: 'IN',
          datapoints: [
            { SERIES_NAME: 'c', REF_DATE: 42, foo: 'bar' },
            { SERIES_NAME: 'a', REF_DATE: 1 },
          ],
        },
        serie4: { type: 'EX', datapoints: [{ SERIES_NAME: 'z', REF_DATE: 667 }] },
        serie5: { type: 'EX', datapoints: [{ REF_DATE: 'foo', peep: 'peep' }] },
      };
      const state = { data: { countrySeries } };
      expect(getCountryDatasourcesSerie(state)).toEqual([
        { REF_DATE: 'foo', peep: 'peep' },
        { REF_DATE: 667, SERIES_NAME: 'z' },
        { REF_DATE: 1, SERIES_NAME: 'a' },
        { REF_DATE: 42, SERIES_NAME: 'c', foo: 'bar' },
      ]);
    });
  });

  /*  describe('getEnhancedCountryAllEstimateSerie', () => {
    it('should throw an error when called with an empty state', () =>
      expect(() => getEnhancedCountryAllEstimateSerie(undefined)).toThrow());

    it('should obtain an enhanced version of the first estimate serie datapoints when called with a filled state', () => {
      const countrySeries = {
        serie1: { type: 'peep' },
        serie2: 'serie2',
        serie4: { type: 'bar', test: 'test' },
        serie5: {
          type: 'ESTIMATE',
          datapoints: [
            { REF_DATE: { valueName: 1998.1 }, y: 12, y0: 42, y1: 7 },
            { REF_DATE: { valueName: -12 }, y: 4, y1: 'peep' },
          ],
        },
        serie6: { type: 'ESTIMATE', foo: 'bar', datapoints: [{ REF_DATE: { valueName: 1000 } }] },
      };
      const state = { data: { countrySeries } };
      expect(getEnhancedCountryAllEstimateSerie(state)).toEqual([
        { Estimate: 12, 'Lower bound': 42, 'Upper bound': 7, Year: 1998.1 },
        { Estimate: 4, 'Lower bound': undefined, 'Upper bound': 'peep', Year: -12 },
      ]);
    });
  });*/

  describe('getEnhancedCountryDatasourcesSerie', () => {
    it('should obtain an empty array when called with an empty state', () =>
      expect(getEnhancedCountryDatasourcesSerie(undefined)).toEqual([]));

    it('should obtain an enhanced version of bot included and excluded series datapoints when called with a filled state', () => {
      const countrySeries = {
        serie1: { type: 'peep' },
        serie2: 'serie2',
        serie3: {
          type: 'IN',
          datapoints: [
            {
              SERIES_NAME: { valueName: 'c' },
              REF_DATE: 42,
              foo: 'bar',
              OBS_STATUS: { valueId: 'ex' },
            },
            {
              SERIES_NAME: { valueName: 'a' },
              SERIES_CATEGORY: { valueName: 'peep' },
              SERIES_METHOD: { valueName: 'x' },
              AGE_GROUP_OF_WOMEN: { valueId: 1 },
              TIME_SINCE_FIRST_BIRTH: { valueId: 'a' },
              INTERVAL: { valueName: 'foo' },
              REF_DATE: 1,
              y: 12.1,
              STD_ERR: { valueName: 'err' },
              OBS_STATUS: { valueId: 'in' },
            },
          ],
        },
        serie4: {
          type: 'EX',
          datapoints: [
            {
              SERIES_NAME: { valueName: 'foobar' },
              SERIES_CATEGORY: { valueName: 'pac' },
              SERIES_METHOD: { valueName: 667 },
              AGE_GROUP_OF_WOMEN: { valueId: 1 },
              TIME_SINCE_FIRST_BIRTH: { valueId: 'xxx' },
              INTERVAL: { valueName: 'bar' },
              REF_DATE: { valueName: 1998 },
              y: 12.1,
              STD_ERR: { valueName: -1 },
              OBS_STATUS: { valueId: 'in' },
            },
          ],
        },
      };
      const state = { data: { countrySeries } };
      expect(getEnhancedCountryDatasourcesSerie(state)).toEqual([
        {
          'Age of Women or Time since first Birth': '1 xxx',
          'Data Collection Method': 667,
          Interval: 'bar',
          'Reference Date': 1998,
          'Series Category': 'pac',
          'Series Name': 'foobar',
          'Standard Error': '-1.0',
          'Used in Model': 'Included',
          Value: '12.1',
        },
        {
          'Age of Women or Time since first Birth': '',
          'Data Collection Method': undefined,
          Interval: undefined,
          'Reference Date': undefined,
          'Series Category': undefined,
          'Series Name': 'c',
          'Standard Error': null,
          'Used in Model': 'Excluded',
          Value: null,
        },
        {
          'Age of Women or Time since first Birth': '1 a',
          'Data Collection Method': 'x',
          Interval: 'foo',
          'Reference Date': undefined,
          'Series Category': 'peep',
          'Series Name': 'a',
          'Standard Error': '0.0',
          'Used in Model': 'Included',
          Value: '12.1',
        },
      ]);
    });
  });

  describe('getCompareEstimateSeries', () => {
    it('should obtain an empty array when called with an empty state', () =>
      expect(getCompareEstimateSeries(undefined)).toEqual([]));

    it('should obtain compareSeries values when called with a filled state', () => {
      const compareSeries = {
        serie1: 'serie1',
        serie2: 'serie2',
      };
      const state = { data: { compareSeries } };
      const compareSeriesValues = ['serie1', 'serie2'];
      expect(getCompareEstimateSeries(state)).toEqual(compareSeriesValues);
    });
  });

  describe('getCompareHasHighlights', () => {
    it('should obtain false when called with an empty state', () =>
      expect(getCompareHasHighlights(undefined)).toBeFalsy());

    it('should obtain true if an element is highlighted with a filled state', () => {
      const compareSeries = {
        serie1: 'serie1',
        serie2: { isHighlighted: true },
        serie3: { isHighlighted: false },
      };
      const state = { data: { compareSeries } };
      expect(getCompareHasHighlights(state)).toBeTruthy();
    });

    it('should obtain false if no element is highlighted with a filled state', () => {
      const compareSeries = {
        serie1: 'serie1',
        serie2: 'serie2',
      };
      const state = { data: { compareSeries } };
      expect(getCompareHasHighlights(state)).toBeFalsy();
    });
  });

  describe('getSeriesNames', () => {
    it('should obtain an empty array when called with an empty state', () =>
      expect(getSeriesNames(undefined)).toEqual([]));

    it('should obtain countrySeries values names when called with a filled state', () => {
      const countrySeries = {
        serie1: { name: 'foo' },
        serie2: { name: 'bar' },
        serie3: { name: 'peep' },
      };
      const state = { data: { countrySeries } };
      const seriesNames = ['foo', 'bar', 'peep'];
      expect(getSeriesNames(state)).toEqual(seriesNames);
    });
  });

  describe('getCountrySeriesUnit', () => {
    it('should obtain null when called with an empty state', () =>
      expect(getCountrySeriesUnit(undefined)).toEqual(null));

    it('should obtain null when called with a state that does contain multiple UNIT_MEASURE prop in the series when called with a filled state', () => {
      const countrySeries = {
        serie1: 'serie2',
        serie2: { type: 'bar', UNIT_MEASURE: 'peep' },
        serie3: { type: 'bar', test: 'test', UNIT_MEASURE: 'foo' },
      };
      const activeTypes = { peep: 'peep', bar: 'bar' };
      const state = { data: { countrySeries, activeTypes } };
      expect(getCountrySeriesUnit(state)).toEqual(null);
    });

    it('should obtain the UNIT_MEASURE when called with a state that does contain one UNIT_MEASURE prop in the series when called with a filled state', () => {
      const UNIT_MEASURE = 'peep';
      const countrySeries = {
        serie1: 'serie2',
        serie2: { type: 'bar', UNIT_MEASURE },
      };
      const activeTypes = { peep: 'peep', bar: 'bar' };
      const state = { data: { countrySeries, activeTypes } };
      expect(getCountrySeriesUnit(state)).toMatch(UNIT_MEASURE);
    });
  });

  describe('getCanLoadData', () => {
    it('should throw an error when called with an empty state', () =>
      expect(() => getCanLoadData('dataType')(undefined)).toThrow());

    it('should obtain true when called with a map data context filled state', () => {
      const dataType = 'map';
      const state = getCanLoadDataMapState;
      expect(getCanLoadData(dataType)(state)).toBeTruthy();
    });

    it('should obtain true when called with a compare data context filled state', () => {
      const dataType = 'compare';
      const state = getCanLoadDataCompareState;
      expect(getCanLoadData(dataType)(state)).toBeTruthy();
    });
  });
  it('should obtain true when called with a country data context filled state', () => {
    const dataType = 'country';
    const state = getCanLoadDataCountryState;
    expect(getCanLoadData(dataType)(state)).toBeTruthy();
  });

  describe('getAnalysisIndicatorDimensionValues', () => {
    const values = [{ id: 'PR_MRY0T4' }, { id: 'PR_MRM0' }];
    const state = {
      data: { dimensions: [{ id: 'INDICATOR', values: [{ id: 1 }, ...values, { id: 2 }] }] },
    };
    it('should return [] if no indicator', () => {
      expect(getAnalysisIndicatorDimensionValues(state)).toEqual([]);
    });
    it('should return [] if unknown type', () => {
      expect(getAnalysisIndicatorDimensionValues(state, { type: 'unknown' })).toEqual([]);
    });
    it('should pass', () => {
      expect(getAnalysisIndicatorDimensionValues(state, { type: 'sdg' })).toEqual(values);
    });
  });
});
