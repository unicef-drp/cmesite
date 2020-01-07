import { compose, toPairs, map, find, prop } from 'ramda';
import Home from './pages/Home/Loadable';
import Data from './pages/Data/Loadable';
import Analysis from './pages/Analysis/Loadable';
import Reports from './pages/Reports/Loadable';
import Methods from './pages/Methods/Loadable';
import About from './pages/About/Loadable';

const routes = {
  home: {
    path: '/',
    exact: true,
    component: Home,
    default: true,
  },
  data: {
    path: '/data/:countryName?',
    exact: true,
    component: Data,
  },
  analysis: {
    path: '/analysis',
    exact: true,
    component: Analysis,
  },
  reports: {
    path: '/reports',
    exact: true,
    component: Reports,
  },
  methods: {
    path: '/methods',
    exact: true,
    component: Methods,
  },
  about: {
    path: '/about',
    exact: true,
    component: About,
  },
};

export const allRoutes = compose(map(([name, r]) => ({ ...r, name })), toPairs)(routes);
export const defaultRoute = find(r => r.default)(allRoutes);
export default routes;
export const getPath = prop('path');
