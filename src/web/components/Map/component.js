/* eslint-disable react/prop-types */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'ramda';
import { geoPath } from 'd3-geo';
import { geoRobinson } from 'd3-geo-projection';
import { feature } from 'topojson-client';
import { withSize } from 'react-sizeme';
import worldData from '../../../mock/map/world-geo';

const style = () => ({});

class WorldMap extends React.Component {
  projection({ width, height }) {
    /*return geoMercator()
      .scale(width / 2 / Math.PI)
      .translate([width / 2, height / 1.4]);*/

    return geoRobinson()
      .scale(width / 2 / Math.PI)
      .translate([width / 2, height / 2]);
  }

  render() {
    const { width } = this.props.size;
    const height = width / 1.77;

    return (
      <div>
        {/* div is required for withSize to work properly */}
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <g className="countries">
            {worldData.features.map((d, i) => (
              <path
                key={`path-${i}`}
                d={geoPath().projection(this.projection({ width, height }))(d)}
                fill={`rgba(38,50,56,${1 / worldData.features.length * i})`}
                stroke="#FFFFFF"
                strokeWidth={0.5}
                onMouseOver={() => console.log(d)}
              />
            ))}
          </g>
        </svg>
      </div>
    );
  }
}

export default compose(withStyles(style, { withTheme: true }), withSize())(
  WorldMap,
);
