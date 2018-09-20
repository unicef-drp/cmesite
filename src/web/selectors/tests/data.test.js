import * as selectors from '../data';

describe('selectors', () => {
  describe('data', () => {
    const countryDimension = {
      id: 'REF_AREA',
      index: 0,
      label: 'Countries',
      values: [
        { id: 'au', label: 'Australia' },
        { id: 'fr', label: 'France', isSelected: true },
      ],
    };
    const otherDimensions = [
      {
        id: 'SEX',
        index: 1,
        label: 'Sex',
        values: [
          { id: 'm', label: 'Male' },
          { id: 'f', label: 'Female', isSelected: true },
        ],
      },
      {
        id: 'TYPE',
        index: 2,
        label: 'Type of data',
        values: [
          { id: 'e', label: 'Estimates', isSelected: true },
          { id: 'sd', label: 'Source data' },
        ],
      },
    ];
    const state = {
      data: {
        activeTab: 0,
        isLoadingStructure: true,
        isDownloadingAllData: true,
        isDownloadingSelectionData: true,
        dimensions: [countryDimension, ...otherDimensions],
      },
    };
    it('should getData', () => {
      expect(selectors.getData(state)).toEqual(state.data);
    });
    it('should getActiveTab', () => {
      expect(selectors.getActiveTab(state)).toEqual(state.data.activeTab);
    });
    it('should getIsLoadingStructure', () => {
      expect(selectors.getIsLoadingStructure(state)).toEqual(
        state.data.isLoadingStructure,
      );
    });
    it('should getDimensions', () => {
      expect(selectors.getDimensions(state)).toEqual(state.data.dimensions);
    });
    it('should getCountryDimension', () => {
      expect(selectors.getCountryDimension(state)).toEqual(countryDimension);
    });
    it('should getOtherDimensions', () => {
      expect(selectors.getOtherDimensions(state)).toEqual(otherDimensions);
    });
    it('should getDataSeries', () => {
      const series = {
        '42INCLUDED': {
          id: '42INCLUDED',
          name: 'DHS Direct Full Birth Histories',
          type: 'INCLUDED',
          datapoints: [
            {
              REF_AREA: {
                id: 'REF_AREA',
                name: 'Reference Area',
                index: 0,
                valueId: 'AFG',
                valueName: 'Afghanistan',
                valueIndex: 0,
              },
              INDICATOR: {
                id: 'INDICATOR',
                name: 'Indicator',
                index: 1,
                valueId: 'MRY0T4',
                valueName: 'Mortality Rate Under 5 Years Old',
                valueIndex: 0,
              },
              SERIES_NAME: {
                id: 'SERIES_NAME',
                name: 'Series Name',
                index: 2,
                valueId: '42',
                valueName: 'DHS Direct Full Birth Histories',
                valueIndex: 0,
              },
              TIME_PERIOD: {
                id: 'TIME_PERIOD',
                name: 'Time Period',
                index: 3,
                valueId: '1987-06',
                valueName: '1987-06',
                valueIndex: 0,
              },
              y: 131.55,
              x: new Date('1987-06'),
              OBS_STATUS: {
                id: 'OBS_STATUS',
                name: 'Observation Status',
                index: 0,
                valueId: 'IN',
                valueName: 'Included in IGME',
                valueIndex: 0,
              },
              UNIT_MEASURE: {
                id: 'UNIT_MEASURE',
                name: 'Unit of Measure',
                index: 1,
                valueId: 'D_PER_1000_B',
                valueName: 'Deaths per 1000 live births',
                valueIndex: 0,
              },
            },
            {
              REF_AREA: {
                id: 'REF_AREA',
                name: 'Reference Area',
                index: 0,
                valueId: 'AFG',
                valueName: 'Afghanistan',
                valueIndex: 0,
              },
              INDICATOR: {
                id: 'INDICATOR',
                name: 'Indicator',
                index: 1,
                valueId: 'MRY0T8',
                valueName: 'Mortality Rate Under 9 Years Old',
                valueIndex: 1,
              },
              SERIES_NAME: {
                id: 'SERIES_NAME',
                name: 'Series Name',
                index: 2,
                valueId: '42',
                valueName: 'DHS Direct Full Birth Histories',
                valueIndex: 0,
              },
              TIME_PERIOD: {
                id: 'TIME_PERIOD',
                name: 'Time Period',
                index: 3,
                valueId: '1990-06',
                valueName: '1990-06',
                valueIndex: 1,
              },
              y: 131.55,
              x: new Date('1990-06'),
              OBS_STATUS: {
                id: 'OBS_STATUS',
                name: 'Observation Status',
                index: 0,
                valueId: 'IN',
                valueName: 'Included in IGME',
                valueIndex: 0,
              },
              UNIT_MEASURE: {
                id: 'UNIT_MEASURE',
                name: 'Unit of Measure',
                index: 1,
                valueId: 'D_PER_1000_B',
                valueName: 'Deaths per 1000 live births',
                valueIndex: 0,
              },
            },
          ],
        },
      };
      expect(selectors.getDataSeries()).toEqual(series);
    });
  });
});
