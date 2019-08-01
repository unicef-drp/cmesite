import * as R from 'ramda';
import HomePage from 'containers/HomePage/Loadable';
import ReportsPage from 'containers/ReportsPage/Loadable';
import MethodsPage from 'containers/MethodsPage/Loadable';
import AboutPage from 'containers/AboutPage/Loadable';

const routes = {
  home: { path: '/', exact: true, component: HomePage },
  reports: { path: '/reports', exact: true, component: ReportsPage },
  methods: { path: '/methods', exact: true, component: MethodsPage },
  about: { path: '/about', exact: true, component: AboutPage },
};

export const allRoutes = R.pipe(
  R.toPairs,
  R.map(([name, r]) => ({ ...r, name })),
)(routes);
export const defaultRoute = R.find(R.prop('default'), allRoutes);

export const test = {reports: {path: '/'}}

export default routes;
