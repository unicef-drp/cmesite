import React from 'react';
import Page from '../../components/Page';
import Header from '../../components/Header';
import Method from '../../components/Method';
import { MethodReports } from '../../components/Reports';
import Footer from '../../components/Footer';

export const MethodsPage = () => (
  <Page>
    <Header routeName="methods" />
    <Method />
    <MethodReports />
    <Footer />
  </Page>
);

export default MethodsPage;
