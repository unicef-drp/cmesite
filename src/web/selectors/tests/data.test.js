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
    /*it('should getDimensions', () => {
      expect(selectors.getDimensions(state)).toEqual(state.data.dimensions);
    });
    it('should getCountryDimension', () => {
      expect(selectors.getCountryDimension(state)).toEqual(countryDimension);
    });
    it('should getOtherDimensions', () => {
      expect(selectors.getOtherDimensions(state)).toEqual(otherDimensions);
    });*/
  });
});
