import * as R from 'ramda';
import { HIERARCHY_LABEL_TOKEN } from '../../constants';

const CHILDREN_KEY = 'children';
const LABEL_KEY = 'label';

const getChildren = R.prop(CHILDREN_KEY);
const getLabel = R.prop(LABEL_KEY);
const labelChild = value =>
  R.ifElse(
    R.isNil,
    R.always(getLabel(value)),
    R.pipe(getLabel, R.flip(R.concat)(`${HIERARCHY_LABEL_TOKEN}${getLabel(value)}`)),
  );
const hasNoChildren = R.pipe(getChildren, R.isEmpty);
const appendChildren = parent => memo => value =>
  R.append(R.assoc('label', labelChild(value)(parent), value), memo);
const doValue = parent => (memo, value) =>
  R.ifElse(
    hasNoChildren,
    appendChildren(parent)(memo),
    R.pipe(getChildren, doValues(value), R.concat(memo)),
  )(value);
const doValues = parent => R.reduce(doValue(parent), []);

export default doValues;
