import { compose, toPairs, map, find, prop } from 'ramda';
import Page2 from './pages/Page2/Loadable';
import Page1 from './pages/Page1/Loadable';

const routes = {
  PAGE1: {
    path: '/',
    exact: true,
    component: Page1,
    default: true,
  },
  PAGE2: {
    path: '/page2',
    exact: true,
    component: Page2,
  },
};

export const allRoutes = compose(map(([name, r]) => ({ ...r, name })), toPairs)(
  routes,
);
export const defaultRoute = find(r => r.default)(allRoutes);
export default routes;
export const getPath = prop('path');
