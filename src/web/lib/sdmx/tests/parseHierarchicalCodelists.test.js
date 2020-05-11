import parse from '../parseHierarchicalCodelists';

const response = {
  data: {
    hierarchicalCodelists: [
      // handle only first
      {
        names: { en: 'CME World Regional Hierarchy' },
        id: 'CME_REGIONS_HIERARCHY',
        version: '1.0',
        agencyID: 'UNICEF',
        hierarchies: [
          // handle all
          {
            names: { en: 'UNICEF Reporting Regions' },
            id: 'UNICEF_REP',
            hierarchicalCodes: [
              // regions list
              {
                codeID: 'UNICEF_EAP',
                hierarchicalCodes: [
                  // countries list, max depth
                  { codeID: 'AUS' },
                  { codeID: 'BRN' },
                ],
              },
              {
                codeID: 'UNICEF_ECA',
                hierarchicalCodes: [
                  // countries list, max depth
                  { codeID: 'ALB' },
                  { codeID: 'ARM' },
                ],
              },
            ],
          },
          {
            names: { en: 'SDG Regions' },
            id: 'UNSDG_REGION',
            hierarchicalCodes: [
              // regions list
              {
                codeID: 'UNSDG_CENTRALASIASOUTHERNASIA',
                hierarchicalCodes: [
                  // countries list, max depth
                  { codeID: 'AFG' },
                  { codeID: 'BGD' },
                ],
              },
              {
                codeID: 'UNSDG_EASTERNASIASOUTHEASTERNASIA',
                hierarchicalCodes: [
                  // countries list, max depth
                  { codeID: 'BRN' },
                  { codeID: 'CHN' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

const hierarchicalCodelists = {
  UNICEF_REP: {
    id: 'UNICEF_REP',
    label: 'UNICEF Reporting Regions',
    codes: {
      UNICEF_EAP: { id: 'UNICEF_EAP', areaType: 'region', regionId: 'UNICEF_EAP' },
      AUS: { id: 'AUS', areaType: 'country', regionId: 'UNICEF_EAP' },
      BRN: { id: 'BRN', areaType: 'country', regionId: 'UNICEF_EAP' },
      UNICEF_ECA: { id: 'UNICEF_ECA', areaType: 'region', regionId: 'UNICEF_ECA' },
      ALB: { id: 'ALB', areaType: 'country', regionId: 'UNICEF_ECA' },
      ARM: { id: 'ARM', areaType: 'country', regionId: 'UNICEF_ECA' },
    },
  },
  UNSDG_REGION: {
    id: 'UNSDG_REGION',
    label: 'SDG Regions',
    codes: {
      UNSDG_CENTRALASIASOUTHERNASIA: {
        id: 'UNSDG_CENTRALASIASOUTHERNASIA',
        areaType: 'region',
        regionId: 'UNSDG_CENTRALASIASOUTHERNASIA',
      },
      AFG: { id: 'AFG', areaType: 'country', regionId: 'UNSDG_CENTRALASIASOUTHERNASIA' },
      BGD: { id: 'BGD', areaType: 'country', regionId: 'UNSDG_CENTRALASIASOUTHERNASIA' },
      UNSDG_EASTERNASIASOUTHEASTERNASIA: {
        id: 'UNSDG_EASTERNASIASOUTHEASTERNASIA',
        areaType: 'region',
        regionId: 'UNSDG_EASTERNASIASOUTHEASTERNASIA',
      },
      BRN: { id: 'BRN', areaType: 'country', regionId: 'UNSDG_EASTERNASIASOUTHEASTERNASIA' },
      CHN: { id: 'CHN', areaType: 'country', regionId: 'UNSDG_EASTERNASIASOUTHEASTERNASIA' },
    },
  },
};

describe('lib', () => {
  describe('sdmx', () => {
    describe('parseHierarchicalCodelists', () => {
      it('should parse', () => {
        expect(parse({ locale: 'en' })(response)).toEqual(hierarchicalCodelists);
      });
    });
  });
});
