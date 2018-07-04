import React from 'react';
import ConfigContext from '../components/ConfigContext';

const withConfig = () => Component => {
  const EnhancedComponent = props => (
    <ConfigContext.Consumer>
      {config => <Component {...props} config={config} />}
    </ConfigContext.Consumer>
  );
  return EnhancedComponent;
};

export default withConfig;
