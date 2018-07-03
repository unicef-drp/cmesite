const { vibe } = require('farso');

vibe.default('main', (mock, { lget, globals: { data1, data2 } }) => {
  mock('data:get').reply([200, data1]);
});
