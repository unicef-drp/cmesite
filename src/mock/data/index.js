const dimensions = {
  COUNTRY: {
    id: 'COUNTRY',
    label: 'Countries',
    values: {
      au: { id: 'au', label: 'Australia' },
      be: { id: 'be', label: 'Bermuda' },
      fr: { id: 'fr', label: 'France', isSelected: true },
      ja: { id: 'ja', label: 'Japan' },
    },
  },
  RATES: {
    id: 'RATES',
    label: 'Mortality rate',
    values: {
      ufmr: { id: 'ufmr', label: 'Under-five mortality rate' },
      imr: { id: 'imr', label: 'Infant mortality rate', isSelected: true },
      nm: { id: 'nm', label: 'Neonatal mortality' },
      mraca514: {
        id: 'mraca514',
        label: 'Mortality rate among children aged 5-14',
      },
    },
  },
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
