import {
  getWP,
  getSplash,
  getNews,
  getReports,
  getFocuses,
  getAbout,
  getMethod,
  getDatanotes,
  getDatanote,
  getDatasetsUpdatedAt,
  getFeaturedReports,
  getMethodReports,
  getDownloads,
  getDownload,
  getDatasetsGroupedByType,
} from '../wp';

describe('/web/selectors/wp', () => {
  describe('getWP', () => {
    it('should obtain undefined when called with an empty state', () =>
      expect(getWP(undefined)).toEqual(undefined));

    it('should obtain wp when called with a filled state', () => {
      const wp = 'wp';
      const state = { wp };
      expect(getWP(state)).toEqual(wp);
    });
  });

  describe('getSplash', () => {
    it('should obtain undefined when called with an empty state', () =>
      expect(getSplash(undefined)).toEqual(undefined));

    it('should obtain the first element of splashes when called with a filled state', () => {
      const splashes = ['splashe1', 'splashe2'];
      const state = { wp: { splashes } };
      expect(getSplash(state)).toEqual('splashe1');
    });
  });

  describe('getNews', () => {
    it('should obtain an empty array when called with an empty state', () =>
      expect(getNews(undefined)).toEqual([]));

    it('should obtain the first two element of news when called with a filled state', () => {
      const news = ['news1', 'news2', 'news3'];
      const state = { wp: { news } };
      expect(getNews(state)).toEqual(['news1', 'news2']);
    });
  });

  describe('getReports', () => {
    it('should obtain an empty array when called with an empty state', () =>
      expect(getReports(undefined)).toEqual([]));

    it('should obtain reports when called with a filled state', () => {
      const reports = 'reports';
      const state = { wp: { reports } };
      expect(getReports(state)).toEqual('reports');
    });
  });

  describe('getFocuses', () => {
    it('should obtain an empty array when called with an empty state', () =>
      expect(getFocuses(undefined)).toEqual([]));

    it('should obtain focuses when called with a filled state', () => {
      const focuses = 'focuses';
      const state = { wp: { focuses } };
      expect(getFocuses(state)).toEqual('focuses');
    });
  });

  describe('getAbout', () => {
    it('should obtain undefined when called with an empty state', () =>
      expect(getAbout(undefined)).toEqual(undefined));

    it('should obtain the first element of abouts when called with a filled state', () => {
      const abouts = ['about1', 'about2'];
      const state = { wp: { abouts } };
      expect(getAbout(state)).toEqual('about1');
    });
  });

  describe('getMethod', () => {
    it('should obtain undefined when called with an empty state', () =>
      expect(getMethod(undefined)).toEqual(undefined));

    it('should obtain the first element of methods when called with a filled state', () => {
      const methods = ['method1', 'method2'];
      const state = { wp: { methods } };
      expect(getMethod(state)).toEqual('method1');
    });
  });

  describe('getDatanotes', () => {
    it('should obtain an empty array when called with an empty state', () =>
      expect(getDatanotes(undefined)).toEqual([]));

    it('should obtain datanotes when called with a filled state', () => {
      const datanotes = 'datanotes';
      const state = { wp: { datanotes } };
      expect(getDatanotes(state)).toEqual('datanotes');
    });
  });

  describe('getDownloads', () => {
    it('should obtain an empty array when called with an empty state', () =>
      expect(getDownloads(undefined)).toEqual([]));

    it('should obtain downloads', () => {
      const downloads = 'downloads';
      const state = { wp: { downloads } };
      expect(getDownloads(state)).toEqual('downloads');
    });
  });

  describe('getDatanote', () => {
    it('should obtain undefined when called with an empty state', () =>
      expect(getDatanote('dataType')(undefined)).toEqual(undefined));

    it('should obtain a datanote corresponding to the dataType when called with a filled state', () => {
      const dataType = 'dataType';
      const expectedDatanote = { acf: { tabs: ['foo', 'dataType', 'bar'] } };
      const state = { wp: { datanotes: ['foo', expectedDatanote, 'bar'] } };
      expect(getDatanote(dataType)(state)).toEqual(expectedDatanote);
    });
  });

  describe('getDatasetsUpdatedAt', () => {
    it('should obtain undefined when called with an empty state', () =>
      expect(getDatasetsUpdatedAt(undefined)).toEqual(undefined));

    it('should obtain the modified_gmt prop of the last element of datasets when called with a filled state', () => {
      const modified_gmt = 'modified_gmt';
      const datasets = ['dataset1', 'dataset2', { modified_gmt }];
      const state = { wp: { datasets } };
      expect(getDatasetsUpdatedAt(state)).toEqual(modified_gmt);
    });
  });

  describe('getFeaturedReports', () => {
    it('should obtain an empty array when called with an empty state', () =>
      expect(getFeaturedReports(undefined)).toEqual([]));

    it('should obtain a filterd version of reports based on ishome when called with a filled state', () => {
      const reports = [{ foo: 'bar' }, { acf: { ishome: true } }, 667, { acf: { ishome: false } }];
      const filteredReports = [{ acf: { ishome: true } }];
      const state = { wp: { reports } };
      expect(getFeaturedReports(state)).toEqual(filteredReports);
    });
  });

  describe('getMethodReports', () => {
    it('should obtain an empty array when called with an empty state', () =>
      expect(getMethodReports(undefined)).toEqual([]));

    it('should obtain a filterd version of reports based on ismethod when called with a filled state', () => {
      const reports = [
        { foo: 'bar' },
        { acf: { ismethod: true } },
        667,
        { acf: { ismethod: false } },
      ];
      const filteredReports = [{ acf: { ismethod: true } }];
      const state = { wp: { reports } };
      expect(getMethodReports(state)).toEqual(filteredReports);
    });
  });

  describe('getDownload', () => {
    it('should obtain undefined when called with an empty state', () =>
      expect(getDownload('type')(undefined)).toEqual(undefined));

    it('should obtain a datanote corresponding to the type when called with a filled state', () => {
      const type = 'type';
      const expectedDownload = { acf: { downloadtype: type } };
      const downloads = [42, expectedDownload, 'foo', { acf: { downloadtype: 667 } }];
      const state = { wp: { downloads } };
      expect(getDownload(type)(state)).toEqual(expectedDownload);
    });
  });

  describe('getDatasetsGroupedByType', () => {
    it('should obtain an empty object when called with an empty state', () =>
      expect(getDatasetsGroupedByType(undefined)).toEqual({}));

    it('should obtain a grouped by specific types datasets without file === null elements when called with a filled state', () => {
      const datasets = [
        { acf: { file: 42, type: 'estimates' } },
        { acf: { file: 'peep', type: 'sourcedata' } },
        { acf: { file: null }, type: 'estimates' },
        { acf: { file: 'bar', type: 'methods' } },
        { acf: { file: null }, type: 'sourcedata' },
        { acf: { file: 667, type: 'foo' } },
      ];
      const state = { wp: { datasets } };
      expect(getDatasetsGroupedByType(state)).toEqual({
        estimates: [{ acf: { file: 42, type: 'estimates' } }],
        sourcedata: [{ acf: { file: 'peep', type: 'sourcedata' } }],
        methods: [{ acf: { file: 'bar', type: 'methods' } }],
      });
    });
  });
});
