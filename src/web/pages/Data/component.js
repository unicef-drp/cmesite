import React from 'react';
import Page from '../../components/Page';
import PageContent from '../../components/PageContent';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Data from '../../components/Data';

export const DataPage = () => (
  <Page>
    <Header routeName="data" />
    <PageContent>
      <Data />
    </PageContent>
    <Footer />
  </Page>
);

export default DataPage;
