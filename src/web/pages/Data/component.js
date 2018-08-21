import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// temp
import Avatar from '@material-ui/core/Avatar';
import BlurOnIcon from '@material-ui/icons/BlurOn';

export const Page = () => (
  <React.Fragment>
    <Header routeName="data" />
    <div
      style={{
        height: 300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Avatar>
        <BlurOnIcon />
      </Avatar>
    </div>
    <Footer />
  </React.Fragment>
);

export default Page;
