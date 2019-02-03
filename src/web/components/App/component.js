import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { map } from 'ramda';
import { allRoutes, defaultRoute } from '../../routes';
import Page from '../../components/Page';
import PageContent from '../../components/PageContent';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const makeRoutes = () => (
  <Switch>
    {map(
      route => (
        <Route key={route.path} path={route.path} exact={route.exact} component={route.component} />
      ),
      allRoutes,
    )}
    {defaultRoute && <Route component={defaultRoute.component} />}
  </Switch>
);

const App = ({ location }) => (
  <Page>
    <Header routeName={location.pathname} />
    <PageContent>{makeRoutes()}</PageContent>
    <Footer />
  </Page>
);

App.propTypes = {
  location: PropTypes.object.isRequired,
};

export default App;
