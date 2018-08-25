import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Data from '../../components/Data';

export const Page = () => (
  <React.Fragment>
    <Header routeName="data" />
    <Data />
    <Footer />
  </React.Fragment>
);

export default Page;
