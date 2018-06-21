import * as Constants from '../constants';

describe('app | containers | App | constants', () => {
  it('should be defined', () => {
    expect(Constants).toBeDefined();
  });

  it('should match snapshot', () => {
    expect(Constants).toMatchSnapshot();
  });
});
