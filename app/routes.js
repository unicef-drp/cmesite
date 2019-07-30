import * as R from 'ramda';
import AboutPage from 'containers/AboutPage/Loadable';

const routes = {
  about: { path: '/about', exact: true, component: AboutPage },
};

export const allRoutes = R.pipe(
  R.toPairs,
  R.map(([name, r]) => ({ ...r, name })),
)(routes);
export const defaultRoute = R.find(R.prop('default'), allRoutes);

export default routes;