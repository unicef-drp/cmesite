import React from 'react';
import Page from '../../components/Page';
import PageContent from '../../components/PageContent';
import Header from '../../components/Header';
import Splash from '../../components/Splash';
import Home from '../../components/Home';
import Datasets from '../../components/Datasets';
import { FeaturedReports } from '../../components/Reports';
import Footer from '../../components/Footer';

export const HomePage = () => (
  <Page>
    <Header routeName="home" />
    <PageContent>
      <Splash />
      <Home />
      <Datasets />
      <FeaturedReports />
    </PageContent>
    <Footer />
  </Page>
);

export default HomePage;
