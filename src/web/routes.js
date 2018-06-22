import { compose, toPairs, map, find, prop } from 'ramda';
import LandingPage from './pages/LandingPage/Loadable';
import Page2 from './pages/Page2/Loadable';

const routes = {
  LANDIN_PAGE: {
    path: '/',
    exact: true,
    component: LandingPage,
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
