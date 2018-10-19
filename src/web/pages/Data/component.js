import React from 'react';
import Page from '../../components/Page';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Data from '../../components/Data';

export const DataPage = () => (
  <Page>
    <Header routeName="data" />
    <Data />
    <Footer />
  </Page>
);

export default DataPage;
