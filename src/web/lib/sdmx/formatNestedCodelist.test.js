import format from './formatNestedCodelist';

const values = [
  {
    children: [],
    id: 'YEM',
    label: 'Yemen',
  },
  {
    children: [],
    id: 'ZMB',
    label: 'Zambia',
  },
  {
    children: [
      {
        children: [],
        id: 'UNICEF_EAP',
        label: 'East Asia and Pacific',
        parent: 'REGIONS_UNICEF',
      },
      {
        children: [],
        id: 'UNICEF_ESA',
        label: 'Eastern and Southern Africa',
        parent: 'REGIONS_UNICEF',
      },
    ],
    id: 'REGIONS_UNICEF',
    label: 'UNICEF Regions',
  },
  {
    children: [
      {
        children: [],
        id: 'UN_AUSNZ',
        label: 'Australia and New Zealand',
        parent: 'REGIONS_SDG',
      },
    ],
    id: 'REGIONS_SDG',
    label: 'SDG Regions',
  },
];

const formattedValues = [
  {
    children: [],
    id: 'YEM',
    label: 'Yemen',
  },
  {
    children: [],
    id: 'ZMB',
    label: 'Zambia',
  },
  {
    children: [],
    id: 'UNICEF_EAP',
    label: 'UNICEF Regions > East Asia and Pacific',
    parent: 'REGIONS_UNICEF',
  },
  {
    children: [],
    id: 'UNICEF_ESA',
    label: 'UNICEF Regions > Eastern and Southern Africa',
    parent: 'REGIONS_UNICEF',
  },
  {
    children: [],
    id: 'UN_AUSNZ',
    label: 'SDG Regions > Australia and New Zealand',
    parent: 'REGIONS_SDG',
  },
];

describe('utils', () => {
  describe('country', () => {
    describe('doValues', () => {
      it('should format values', () => {
        expect(format()(values)).toEqual(formattedValues);
      });
    });
  });
});
