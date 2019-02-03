import React from 'react';
import Splash from '../../components/Splash';
import Home from '../../components/Home';
import Datasets from '../../components/Datasets';
import { FeaturedReports } from '../../components/Reports';

export const HomePage = () => (
  <React.Fragment>
    <Splash />
    <Home />
    <Datasets />
    <FeaturedReports />
  </React.Fragment>
);

export default HomePage;
