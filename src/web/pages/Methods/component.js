import React from 'react';
import Header from '../../components/Header';
import Method from '../../components/Method';
import { MethodReports } from '../../components/Reports';
import Footer from '../../components/Footer';

export const Page = () => (
  <React.Fragment>
    <Header routeName="methods" />
    <Method />
    <MethodReports />
    <Footer />
  </React.Fragment>
);

export default Page;
