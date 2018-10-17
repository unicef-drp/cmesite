/* eslint-disable react/prop-types */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'ramda';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import { withSize } from 'react-sizeme';

const style = () => ({});

class WorldMap extends React.Component {
  constructor() {
    super();
    this.state = {
      worldData: [],
    };
  }

  projection({ width, height }) {
    return geoMercator()
      .scale(width / 2 / Math.PI)
      .translate([width / 2, height / 1.4]);
  }

  componentDidMount() {
    fetch('https://unpkg.com/world-atlas@1.1.4/world/110m.json').then(response => {
      if (response.status !== 200) {
        // console.log(`There was a problem: ${response.status}`);
        return;
      }
      response.json().then(worldData => {
        this.setState({
          worldData: feature(worldData, worldData.objects.countries).features,
        });
      });
    });
  }

  render() {
    const { width } = this.props.size;
    const height = width / 1.77;

    return (
      <div>
        {/* div is required for withSize to work properly */}
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <g className="countries">
            {this.state.worldData.map((d, i) => (
              <path
                key={`path-${i}`}
                d={geoPath().projection(this.projection({ width, height }))(d)}
                className="country"
                fill={`rgba(38,50,56,${1 / this.state.worldData.length * i})`}
                stroke="#FFFFFF"
                strokeWidth={0.5}
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
