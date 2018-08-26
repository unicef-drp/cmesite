import * as selectors from '../data';

describe('selectors', () => {
  describe('data', () => {
    const countryDimension = {
      id: 'COUNTRY',
      label: 'Countries',
      values: {
        au: { id: 'au', label: 'Australia' },
        fr: { id: 'fr', label: 'France', isSelected: true },
      },
    };
    const otherDimensions = {
      SEX: {
        id: 'SEX',
        label: 'Sex',
        values: {
          m: { id: 'm', label: 'Male' },
          f: { id: 'f', label: 'Female', isSelected: true },
        },
      },
      TYPE: {
        id: 'TYPE',
        label: 'Type of data',
        values: {
          e: { id: 'e', label: 'Estimates', isSelected: true },
          sd: { id: 'sd', label: 'Source data' },
        },
      },
    };
    const state = {
      data: {
        activeTab: 0,
        isLoadingStructure: false,
        dimensions: {
          [countryDimension.id]: countryDimension,
          ...otherDimensions,
        },
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
  });
});
