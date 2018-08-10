import React from 'react';
import Loadable from 'react-loadable';

const style = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export default Loadable({
  loader: () => import('./index'),
  loading: () => (
    <div style={style}>
      <div>loading...</div>
    </div>
  ),
});
