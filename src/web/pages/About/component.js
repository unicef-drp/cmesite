import React from 'react';
import Page from '../../components/Page';
import Header from '../../components/Header';
import About from '../../components/About';
import Footer from '../../components/Footer';

export const AboutPage = () => (
  <Page>
    <Header routeName="about" />
    <About />
    <Footer />
  </Page>
);

export default AboutPage;
