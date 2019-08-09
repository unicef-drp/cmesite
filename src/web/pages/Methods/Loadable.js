import React from 'react';
import Loadable from 'react-loadable';
import Loader from '../../components/Loader';

export default Loadable({
  loader: () => import('./index'),
  loading: () => <Loader isPage />,
});
