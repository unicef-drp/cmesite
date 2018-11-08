/* eslint-disable react/prop-types */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose, propOr } from 'ramda';
import { geoPath } from 'd3-geo';
import { geoRobinson } from 'd3-geo-projection';
import { withSize } from 'react-sizeme';
import worldData from '../../../mock/map/world-geo';
import Legend from './legend';
import { getColor } from './utils';

const style = () => ({
  wrapper: {
    //backgroundColor: theme.palette.primary.light,
  },
});

class WorldMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projection: geoRobinson(),
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    let { projection } = prevState;
    const { width } = nextProps.size;
    const height = width / 1.77;

    projection.scale(width / 1.8 / Math.PI).translate([width / 2, height / 1.8]);

    return { ...prevState, projection };
  };

  render() {
    const { theme, size, mapSerie, classes } = this.props;
    const { width } = size;
    const height = width / 1.77;
    const { projection } = this.state;
    const datapoints = propOr([], 'datapoints', mapSerie);
    const { mapAboveColor, mapNoneColor, mapColorScale } = theme.palette;

    return (
      <div className={classes.wrapper}>
        {/* div is required for withSize to work properly */}
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <g>
            {worldData.features.map((d, i) => (
              <path
                key={`path-${i}`}
                d={geoPath().projection(projection)(d)}
                fill={getColor({ scale: mapColorScale, d, datapoints, noneColor: mapNoneColor })}
                stroke={theme.palette.secondary.main}
                strokeWidth={0.2}
                //onMouseOver={() => console.log(d)}
              />
            ))}
          </g>
        </svg>
        <Legend scale={mapColorScale} colors={{ none: mapNoneColor, above: mapAboveColor }} />
      </div>
    );
  }
}

export default compose(withStyles(style, { withTheme: true }), withSize())(WorldMap);
