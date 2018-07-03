const path = require('path');
const { data1, data2 } = require('./data');

module.exports = {
  host: 'localhost',
  port: 8181,
  vibes: path.join(__dirname, './**/*vibes.js'),
  endpoints: path.join(__dirname, './**/endpoints.js'),
  globals: {
    data1,
    data2,
  },
};
