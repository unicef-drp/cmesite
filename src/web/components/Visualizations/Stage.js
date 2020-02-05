import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const Context = React.createContext(null);

export const Stage = ({ width, height, children }) => {
  const svgRef = useRef(null);
  const [svg, setSvg] = useState(null);
  useEffect(() => setSvg(svgRef.current), []);
  return (
    <svg ref={svgRef} width={width} height={height}>
      <Context.Provider value={svg}>{children}</Context.Provider>
    </svg>
  );
};

Stage.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  children: PropTypes.node,
};

export const useSvg = () => React.useContext(Context);
