import { compose, toPairs, map, find, prop } from 'ramda';
import LandingPage from './pages/LandingPage/Loadable';
import Page2 from './pages/Page2/Loadable';

const routes = {
  home: {
    path: '/',
    exact: true,
    component: LandingPage,
    default: true,
  },
  data: {
    path: '/data',
    exact: true,
    component: Page2,
  },
  reports: {
    path: '/reports',
    exact: true,
    component: Page2,
  },
  methods: {
    path: '/methods',
    exact: true,
    component: Page2,
  },
  about: {
    path: '/about',
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
