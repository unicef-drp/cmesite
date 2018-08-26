const dimensions = [
  {
    id: 'COUNTRY',
    index: 0,
    label: 'Countries',
    values: [
      { id: 'au', label: 'Australia' },
      { id: 'be', label: 'Bermuda' },
      { id: 'fr', label: 'France', isSelected: true },
      { id: 'ja', label: 'Japan' },
    ],
  },
  {
    id: 'RATES',
    index: 1,
    label: 'Mortality rate',
    values: [
      { id: 'ufmr', label: 'Under-five mortality rate' },
      { id: 'imr', label: 'Infant mortality rate', isSelected: true },
      { id: 'nm', label: 'Neonatal mortality' },
      { id: 'mraca514', label: 'Mortality rate among children aged 5-14' },
    ],
  },
  {
    id: 'SEX',
    index: 2,
    label: 'Sex',
    values: [
      { id: 'm', label: 'Male' },
      { id: 'f', label: 'Female', isSelected: true },
    ],
  },
  {
    id: 'TYPE',
    index: 3,
    label: 'Type of data',
    values: [
      { id: 'e', label: 'Estimates', isSelected: true },
      { id: 'sd', label: 'Source data' },
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
