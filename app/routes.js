import * as R from 'ramda';
import ReportsPage from 'containers/ReportsPage/Loadable';
import MethodsPage from 'containers/MethodsPage/Loadable';
import AboutPage from 'containers/AboutPage/Loadable';

const routes = {
  reports: { path: '/reports', exact: true, component: ReportsPage },
  methods: { path: '/methods', exact: true, component: MethodsPage },
  about: { path: '/about', exact: true, component: AboutPage },
};

export const allRoutes = R.pipe(
  R.toPairs,
  R.map(([name, r]) => ({ ...r, name })),
)(routes);
export const defaultRoute = R.find(R.prop('default'), allRoutes);

export default routes;