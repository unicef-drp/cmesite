import * as R from 'ramda';

const REGION = 'region';
const COUNTRY = 'country';

export const REGIONS = [
  { id: 0, label: 'West and Central Africa', min: 60, max: 325, value: 198 },
  { id: 1, label: 'Eastern and Southern Africa', min: 12, max: 250, value: 167 },
  { id: 2, label: 'South Asia', min: 25, max: 175, value: 121 },
  { id: 3, label: 'Middle East and North Africa', min: 12, max: 112, value: 69 },
  { id: 4, label: 'East Asia and Pacific', min: 6, max: 175, value: 54 },
  { id: 5, label: 'Latin America and Caribbean', min: 10, max: 140, value: 57 },
  { id: 6, label: 'Eastern Europe and Central asia', min: 12, max: 110, value: 45 },
  { id: 7, label: 'North America', min: 3, max: 10, value: 8 },
  { id: 8, label: 'Western Europe', min: 2, max: 18, value: 7 },
];

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default R.reduce(
  (memo, { label, min, max, value, id }) => {
    const values = R.times(
      () => ({
        value: getRandomIntInclusive(min, max),
        regionId: id,
        areaType: COUNTRY,
        label: '-',
      }),
      30,
    );
    return R.pipe(R.append({ value, regionId: id, areaType: REGION, label }), R.concat(values))(
      memo,
    );
  },
  [],
  R.reverse(REGIONS),
);
