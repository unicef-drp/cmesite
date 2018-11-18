import React from 'react';
import Page from '../../components/Page';
import PageContent from '../../components/PageContent';
import Header from '../../components/Header';
import About from '../../components/About';
import Footer from '../../components/Footer';

export const AboutPage = () => (
  <Page>
    <Header routeName="about" />
    <PageContent>
      <About />
    </PageContent>
    <Footer />
  </Page>
);

export default AboutPage;
