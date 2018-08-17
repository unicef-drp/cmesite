import React from 'react';
import Header from '../../components/Header';
import Reports from '../../components/Reports';
import Footer from '../../components/Footer';

export const Page = () => (
  <React.Fragment>
    <Header selectedName="reports" />
    <Reports />
    <Footer />
  </React.Fragment>
);

export default Page;
