import faker from 'faker';
import * as R from 'ramda';

const DEFCON = 2;
const META = { 'content-languages': ['en'] };
const DIMENSIONS = ['REF_AREA', 'INDICATOR', 'TIME_PERIOD', 'SERIES_NAME'];
const ATTRIBUTES = ['OBS_STATUS', 'UNIT_MEASURE'];
const OBS_STATUS = ['IN', 'EX'];

const getRandom = (from, to) => Math.floor(Math.random() * to) + from;
const dates = R.times(n => `${2000 + n * 2}-${n % 12 + 1}`, 64);
let inc = -1;
const getDate = () => {
  inc += 1;
  return R.nth(inc, dates);
};

const valuesFactory = id => {
  const engine = id => index =>
    R.cond([
      [
        R.equals('REF_AREA'),
        () => {
          const address = faker.address;
          return { id: address.countryCode(), name: { en: address.country() } };
        },
      ],
      [
        R.equals('INDICATOR'),
        () => ({
          id: faker.random.number(),
          name: { en: faker.commerce.department() },
        }),
      ],
      [
        R.equals('TIME_PERIOD'),
        () => {
          const date = getDate();
          return { id: date, name: { en: date } };
        },
      ],
      [
        R.equals('SERIES_NAME'),
        () => ({
          id: faker.random.number(),
          name: { en: faker.commerce.productName() },
        }),
      ],
      [
        R.equals('OBS_STATUS'),
        () => {
          const id = R.nth(index, OBS_STATUS);
          return { id, name: { en: id } };
        },
      ],
      [
        R.equals('UNIT_MEASURE'),
        () => ({
          id: faker.random.number(),
          name: { en: faker.name.title() },
        }),
      ],
    ])(id);

  const defcon = R.cond([
    [R.equals('TIME_PERIOD'), R.always(64)],
    [R.equals('OBS_STATUS'), R.always(R.length(OBS_STATUS))],
    [R.T, R.always(DEFCON)],
  ]);
  return R.times(engine(id), defcon(id));
};

const artefactFactory = id => ({
  id,
  name: { en: R.toLower(id) },
  roles: [id],
  values: valuesFactory(id),
});

const permutations = R.compose(R.sequence(R.of), R.flip(R.repeat));
const observationsFactory = () =>
  R.reduce(
    (memo, permutation) =>
      R.assoc(
        R.join(':', permutation),
        [getRandom(0, 100), 0, getRandom(0, DEFCON)],
        memo,
      ),
    {},
    permutations(R.length(DIMENSIONS), R.times(R.identity, DEFCON)),
  );

export default () => ({
  meta: META,
  data: {
    dataSets: [{ observations: observationsFactory() }],
    structure: {
      name: { en: 'IGME Child Mortality Estimates' },
      dimensions: { observation: R.map(artefactFactory, DIMENSIONS) },
      attributes: { observation: R.map(artefactFactory, ATTRIBUTES) },
    },
  },
});
