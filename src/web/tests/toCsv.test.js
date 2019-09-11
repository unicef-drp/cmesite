import { toCsv } from '../utils';

describe('toCsv', () => {
  describe('when called with arrays as data', () => {
    it('should match', () => {
      const fields = ['a', 'b', 'c'];
      const data = [[1, 2, 3], [667, 3, 4], [5, 6, 7]];
      expect(toCsv(fields, data)).toMatch('a,b,c\r\n1,2,3\r\n667,3,4\r\n5,6,7');
    });
    describe('when called with missing fields', () => {
      it('should match', () => {
        const fields = ['a', 'b', 'c', 'd'];
        const data = [[1, 2, 3], [667, 3, 4], [5, 6, 7]];
        expect(toCsv(fields, data)).toMatch('a,b,c,d\r\n1,2,3,\r\n667,3,4,\r\n5,6,7,');
      });
    });
  });

  describe('when called with objects as data', () => {
    it('should match', () => {
      const fields = ['a', 'b', 'c'];
      const data = [{ a: 1, b: 2, c: 3 }, { a: 667, b: 3, c: 4 }, { a: 5, b: 6, c: 7 }];
      expect(toCsv(fields, data)).toMatch('a,b,c\r\n1,2,3\r\n667,3,4\r\n5,6,7');
    });
    describe('when called with missing fields', () => {
      it('should match', () => {
        const fields = ['a', 'b', 'c', 'd'];
        const data = [{ a: 1, d: 2, c: 3 }, { a: 667, d: 3, c: 4 }, { a: 5, d: 6, c: 7 }];
        expect(toCsv(fields, data)).toMatch('a,b,c,d\r\n1,,3,2\r\n667,,4,3\r\n5,,7,6');
      });
    });
  });

  describe('when called with both arrays and objects as data', () => {
    it('should match', () => {
      const fields = ['a', 'b', 'c'];
      const data = [{ a: 1, b: 2, c: 3 }, [667, 3, 4], { a: 5, b: 6, c: 7 }];
      expect(toCsv(fields, data)).toMatch('a,b,c\r\n1,2,3\r\n667,3,4\r\n5,6,7');
    });
  });

  describe('when called with options', () => {
    it('should match', () => {
      const fields = ['a', 'b', 'c'];
      const data = [{ a: 1, b: 2, c: 3 }, [667, 3, 4], { a: 5, b: 6, c: 7 }];
      const options = { delimiter: '.', eol: ' ' };
      expect(toCsv(fields, data, options)).toMatch('a.b.c 1.2.3 667.3.4 5.6.7');
    });
  });

  describe('when called with options', () => {
    it('should match', () => {
      const fields = ['a', 'b', 'c'];
      const data = [{ a: 1, b: 2, c: 3 }, [667, 3, 4], { a: 5, b: 6, c: 7 }];
      const options = { delimiter: '.', eol: ' ' };
      expect(toCsv(fields, data, options)).toMatch('a.b.c 1.2.3 667.3.4 5.6.7');
    });
  });

  describe('when called without data', () => {
    it('should match', () => {
      const fields = ['a', 'b', 'c'];
      const data = null;
      expect(toCsv(fields, data)).toMatch('a,b,c');
    });
  });
});
