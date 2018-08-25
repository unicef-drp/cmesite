import { createSelector } from 'reselect';
import { prop, always } from 'ramda';

export const getData = prop('data');
export const getActiveTab = createSelector(getData, prop('activeTab'));
export const getTitle = always('Female infant mortality rate');
export const getNotes = always(
  'Included Data points refer to aliquip perpetua vel in, alia vide alterum vim et. Quo mutat dolore semper id. Ne vim quodsi imperdiet, quando facilisis eu mel. Tation alterum facilisi vis ea. No sale movet munere ius. Ne his putant minimum. Pro ut enim dicta prompta. Ad porro discere nam. Usu accumsan theophrastus necessitatibus ea, et usu quaeque adversarium. His et nonumy voluptua, quo utinam audire petentium in. Libris putant vim in. His legimus electram salutandi ad, eum nisl oratio omnesque eu. Pro tale vero ea, soleat ignota ei sea. Ex accumsan nominati consequat nec, zril prodesset repudiandae in cum. Ne his putant minimum. Pro ut enim dicta prompta. Ad porro discere nam. Usu accumsan theophrastus necessitatibus ea, et usu quaeque adversarium. His et nonumy voluptua, quo utinam audire petentium in. Libris putant vim in. His legimus electram salutandi ad, eum nisl oratio omnesque eu',
);
