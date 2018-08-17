import { compose, toPairs, map, find, prop } from 'ramda';
import Home from './pages/Home/Loadable';
import Reports from './pages/Reports/Loadable';
import About from './pages/About/Loadable';

const routes = {
  home: {
    path: '/',
    exact: true,
    component: Home,
    default: true,
  },
  data: {
    path: '/data',
    exact: true,
    component: Home,
  },
  reports: {
    path: '/reports',
    exact: true,
    component: Reports,
  },
  methods: {
    path: '/methods',
    exact: true,
    component: Home,
  },
  about: {
    path: '/about',
    exact: true,
    component: About,
  },
};

export const allRoutes = compose(map(([name, r]) => ({ ...r, name })), toPairs)(
  routes,
);
export const defaultRoute = find(r => r.default)(allRoutes);
export default routes;
export const getPath = prop('path');
