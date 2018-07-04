import { compose, withProps, mapProps } from 'recompose';
import { pathOr, omit } from 'ramda';
import withConfig from '../../hocs/config';
import component from './component';

const DEFAULT_LOCALE = 'en';
export const enhance = compose(
  withConfig(),
  withProps(pathOr({ locale: DEFAULT_LOCALE }, ['config', 'language'])),
  mapProps(omit(['config'])),
);
export default enhance(component);
