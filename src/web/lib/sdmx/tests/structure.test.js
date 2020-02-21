import structureParser, { filterArtefacts } from '../structure';
import structureParserInput from '../../../../mock/data/structureParserInput';

describe('/web/lib/sdmx/structure', () => {
  describe('filterArtefacts', () => {
    it('should return the artefacts who contain a dimensionId', () => {
      const dimensionIds = [42, 'foo', 667];
      const artefacts = [{ id: 42, test: 'test' }, { id: 12 }, { id: 'foo', a: 'b' }];
      expect(filterArtefacts(dimensionIds)(artefacts)).toEqual([
        { id: 42, test: 'test' },
        { id: 'foo', a: 'b' },
      ]);
    });
  });

  describe('structureParser', () => {
    it('should match snapshot', () => {
      const options = { locale: 'en', dimensionIds: ['REF_AREA', 'INDICATOR', 'SEX'] };
      expect(structureParser(options)(structureParserInput)).toMatchSnapshot();
    });
  });
});
