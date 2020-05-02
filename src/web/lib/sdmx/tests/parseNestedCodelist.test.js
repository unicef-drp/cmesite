import parse from '../parseNestedCodelist';

const list = [
  {
    id: 'YEM',
    name: {
      en: 'Yemen',
    },
  },
  {
    id: 'ZMB',
    name: {
      en: 'Zambia',
    },
  },
  {
    id: 'ZWE',
    name: {
      en: 'Zimbabwe',
    },
  },
  {
    id: 'REGIONS_UNICEF',
    name: {
      en: 'UNICEF Regions',
    },
  },
  {
    id: 'UNICEF_EAP',
    name: {
      en: 'East Asia and Pacific',
    },
    parent: 'REGIONS_UNICEF',
  },
  {
    id: 'UNICEF_ESA',
    name: {
      en: 'Eastern and Southern Africa',
    },
    parent: 'REGIONS_UNICEF',
  },
  {
    id: 'REGIONS_SDG',
    name: {
      en: 'SDG Regions',
    },
  },
  {
    id: 'UN_AUSNZ',
    name: {
      en: 'Australia and New Zealand',
    },
    parent: 'REGIONS_SDG',
  },
  {
    id: 'UN_CENTRALASIA',
    name: {
      en: 'Central Asia',
    },
    parent: 'REGIONS_SDG',
  },
];

const hierarchy = [
  {
    children: [],
    id: 'YEM',
    name: {
      en: 'Yemen',
    },
  },
  {
    children: [],
    id: 'ZMB',
    name: {
      en: 'Zambia',
    },
  },
  {
    children: [],
    id: 'ZWE',
    name: {
      en: 'Zimbabwe',
    },
  },
  {
    children: [
      {
        children: [],
        id: 'UNICEF_EAP',
        name: {
          en: 'East Asia and Pacific',
        },
        parent: 'REGIONS_UNICEF',
      },
      {
        children: [],
        id: 'UNICEF_ESA',
        name: {
          en: 'Eastern and Southern Africa',
        },
        parent: 'REGIONS_UNICEF',
      },
    ],
    id: 'REGIONS_UNICEF',
    name: {
      en: 'UNICEF Regions',
    },
  },
  {
    children: [
      {
        children: [],
        id: 'UN_AUSNZ',
        name: {
          en: 'Australia and New Zealand',
        },
        parent: 'REGIONS_SDG',
      },
      {
        children: [],
        id: 'UN_CENTRALASIA',
        name: {
          en: 'Central Asia',
        },
        parent: 'REGIONS_SDG',
      },
    ],
    id: 'REGIONS_SDG',
    name: {
      en: 'SDG Regions',
    },
  },
];

describe('lib', () => {
  describe('sdmx', () => {
    describe('parseNestedCodelist', () => {
      it('should parse', () => {
        expect(parse(list)).toEqual(hierarchy);
      });
    });
  });
});
