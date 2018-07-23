import { compose, withProps } from 'recompose';
import { tail } from 'ramda';
import { allRoutes } from '../../routes';
import Component from './component';

export const enhance = compose(withProps(() => ({ routes: tail(allRoutes) })));
export default enhance(Component);
