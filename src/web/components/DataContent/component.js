import React from 'react';
import PropTypes from 'prop-types';

const DataContent = ({ children }) => (
  <React.Fragment>{children}</React.Fragment>
);

DataContent.propTypes = {
  children: PropTypes.node,
};

export default DataContent;
