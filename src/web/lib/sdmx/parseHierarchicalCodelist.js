import * as R from 'ramda';

const PARENT_KEY = 'parent';
const CHILDREN_KEY = 'children';

const overChildren = R.over(R.lensProp(CHILDREN_KEY));
const findChildren = list => parent =>
  R.filter(child => R.prop(PARENT_KEY, child) === parent.id, list);
const assocChildren = list =>
  R.map(
    R.pipe(
      parent => R.assoc(CHILDREN_KEY, findChildren(list)(parent), parent),
      parent => overChildren(assocChildren(list), parent),
    ),
  );
const removeParentIds = R.map(R.pipe(R.dissoc(PARENT_KEY), overChildren(removeParentIds)));
const isTop = R.compose(R.isNil, R.prop(PARENT_KEY));
const keepOnlyTop = R.filter(isTop);

export default list => R.pipe(assocChildren(list), keepOnlyTop)(list);
