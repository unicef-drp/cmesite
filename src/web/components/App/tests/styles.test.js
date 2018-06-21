import styles from '../styles';

describe('app | containers | App | styles', () => {
  it('should be defined', () => {
    expect(styles).toBeDefined();
  });

  it('should match snapshot', () => {
    expect(styles).toMatchSnapshot();
  });
});
