import React, { useEffect, useState } from 'react';
import { select as d3Select } from 'd3-selection';
import { zoom as d3Zoom, zoomTransform as d3ZoomTransform } from 'd3-zoom';
import PropTypes from 'prop-types';
import { useSvg } from './Stage';

export const ZoomContainer = ({ children }) => {
  const svgElement = useSvg();
  const [{ x, y, k }, setTransform] = useState({ x: 0, y: 0, k: 1 });

  useEffect(
    () => {
      if (!svgElement) return;
      const selection = d3Select(svgElement);
      const zoom = d3Zoom().on('zoom', () => setTransform(d3ZoomTransform));
      selection.call(zoom);
      return () => selection.on('.zoom', null);
    },
    [svgElement],
  );

  return <g transform={`translate(${x}, ${y}) scale(${k})`}>{children}</g>;
};

ZoomContainer.propTypes = {
  children: PropTypes.node,
};
