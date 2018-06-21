import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { map } from 'ramda';
import { allRoutes, defaultRoute } from '../../routes';

const makeRoutes = () => (
  <Switch>
    {map(
      route => (
        <Route
          key={route.path}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ),
      allRoutes,
    )}
    {defaultRoute && <Route component={defaultRoute.component} />}
  </Switch>
);

const App = () => <div>{makeRoutes()}</div>;

App.propTypes = {};

export default App;
