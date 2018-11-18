import React from 'react';
import Page from '../../components/Page';
import PageContent from '../../components/PageContent';
import Header from '../../components/Header';
import Method from '../../components/Method';
import { MethodReports } from '../../components/Reports';
import Footer from '../../components/Footer';

export const MethodsPage = () => (
  <Page>
    <Header routeName="methods" />
    <PageContent>
      <Method />
      <MethodReports />
    </PageContent>
    <Footer />
  </Page>
);

export default MethodsPage;
