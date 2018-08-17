import React from 'react';
import Header from '../../components/Header';
import About from '../../components/About';
import Footer from '../../components/Footer';

export const Page = () => (
  <React.Fragment>
    <Header selectedName="about" />
    <About />
    <Footer />
  </React.Fragment>
);

export default Page;
