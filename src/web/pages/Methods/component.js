import React from 'react';
import Header from '../../components/Header';
import Method from '../../components/Method';
import Reports from '../../components/Reports';
import Footer from '../../components/Footer';

export const Page = () => (
  <React.Fragment>
    <Header routeName="methods" />
    <Method />
    <Reports isHome />
    <Footer />
  </React.Fragment>
);

export default Page;
