const dimensions = [
  {
    id: 'RATES',
    label: 'Mortality rate',
    values: [
      { id: 1, label: 'Under-five mortality rate' },
      { id: 2, label: 'Infant mortality rate', isSelected: true },
      { id: 3, label: 'Neonatal mortality' },
      { id: 4, label: 'Mortality rate among children aged 5-14' },
    ],
  },
  {
    id: 'SEX',
    label: 'Sex',
    values: [
      { id: 1, label: 'Male' },
      { id: 2, label: 'Female', isSelected: true },
    ],
  },
  {
    id: 'TYPE',
    label: 'Type of data',
    values: [
      { id: 1, label: 'Estimates', isSelected: true },
      { id: 2, label: 'Source data' },
    ],
  },
];

const splash = {
  id: 1,
  title: { rendered: 'title of the splash' },
  content: { rendered: 'content of the splash' },
  acf: {
    image: {
      alt: 'alternative text for accessibility',
      url: 'url of the image',
    },
  },
};

const news = {
  id: 1,
  title: { rendered: 'title of the news' },
  content: { rendered: 'content of the news' },
  acf: {
    image: {
      alt: 'alternative text for accessibility',
      url: 'url of the image',
    },
  },
};

const report = {
  id: 1,
  title: { rendered: 'title of the report' },
  acf: {
    file: {
      id: 1,
      description: 'lang of the report (related to the file)',
      url: 'url of the file',
    },
    image: {
      alt: 'alternative text for accessibility',
      url: 'url of the image',
    },
  },
};

const dataset = {
  id: 1,
  title: { rendered: 'title of the dataset' },
  modified_gmt: 'updated at',
  acf: {
    file: {
      id: 1,
      description: 'subtitle of the dataset (related to the file)',
      url: 'url of the file',
    },
  },
};

const data1 = { type: 'data1' };
const data2 = { type: 'data2' };

module.exports = {
  data1,
  data2,
  news,
  report,
  dataset,
  splash,
  dimensions,
};
