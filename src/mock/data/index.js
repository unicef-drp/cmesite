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
