import React from 'react';
import Page from '../../components/Page';
import PageContent from '../../components/PageContent';
import Header from '../../components/Header';
import Reports from '../../components/Reports';
import Footer from '../../components/Footer';

export const ReportsPage = () => (
  <Page>
    <Header routeName="reports" />
    <PageContent>
      <Reports />
    </PageContent>
    <Footer />
  </Page>
);

export default ReportsPage;
