import * as R from 'ramda';
import { getName } from './structure';
import { REGION, COUNTRY } from '../../constants';

const getCodes = R.reduce(
  (memo, region) =>
    R.reduce(
      (omem, { codeID }) =>
        R.assoc(codeID, { id: codeID, areaType: COUNTRY, regionId: region.codeID }, omem),
      R.assoc(
        region.codeID,
        { id: region.codeID, areaType: REGION, regionId: region.codeID },
        memo,
      ),
      region.hierarchicalCodes,
    ),
  {},
);

export default ({ locale } = {}) =>
  R.pipe(
    R.pathOr([], ['data', 'hierarchicalCodelists', 0, 'hierarchies']),
    R.reduce(
      (memo, { id, hierarchicalCodes, ...hierarchy }) =>
        R.assoc(
          id,
          { id, label: getName(locale)(hierarchy), codes: getCodes(hierarchicalCodes) },
          memo,
        ),
      {},
    ),
  );
