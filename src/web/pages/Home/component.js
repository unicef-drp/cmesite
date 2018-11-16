import React from 'react';
import Page from '../../components/Page';
import Header from '../../components/Header';
import Splash from '../../components/Splash';
import Home from '../../components/Home';
import Datasets from '../../components/Datasets';
import { FeaturedReports } from '../../components/Reports';
import Footer from '../../components/Footer';

export const HomePage = () => (
  <Page>
    <Header routeName="home" />
    <Splash />
    <Home />
    <Datasets />
    <FeaturedReports />
    <Footer />
  </Page>
);

export default HomePage;
