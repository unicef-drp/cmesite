/* eslint-disable react/prop-types */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { prop, map, compose } from 'ramda';
import { scaleLinear, scaleTime, scaleOrdinal } from 'd3-scale';
import { select } from 'd3-selection';
import { line, area } from 'd3-shape';
import { withSize } from 'react-sizeme';
import Axis from './axis';
import Line from './line';
import Area from './area';

const style = theme => ({
  axis: {
    '& path': {
      stroke: theme.palette.secondary.dark,
      shapeRendering: 'crispEdges',
    },
    '& line': {
      stroke: theme.palette.secondary.dark,
      shapeRendering: 'crispEdges',
    },
    '& text': {
      fill: theme.palette.primary.dark,
      fontWeight: 'bold',
    },
  },
  axisBottom: {
    '& .tick:first-of-type': {
      display: 'none',
    },
    '& .tick:last-of-type': {
      display: 'none',
    },
  },
  line: {
    strokeWidth: 2,
  },
});

export class Chart extends React.Component {
  state = {
    //height,
    //contentWidth,
    //contentHeight,
    xScale: scaleTime(),
    yScale: scaleLinear(),
    //colorScale: scaleOrdinal().domain().range(['#E6ED46', '#60C9E2', '#DE405C', '#6B3889']),
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    let { xScale, yScale } = prevState;

    const height = nextProps.size.width / 1.77;

    const contentWidth =
      nextProps.size.width - nextProps.margin.left - nextProps.margin.right;
    const contentHeight =
      height - nextProps.margin.top - nextProps.margin.bottom;

    xScale
      .domain([new Date(2000, 2, 1), new Date(2020, 0, 1)])
      .range([0, contentWidth])
      .nice();
    yScale
      .domain([0, 95])
      .range([contentHeight, 0])
      .nice();

    return {
      ...prevState,
      height,
      contentWidth,
      contentHeight,
      xScale,
      yScale,
    };
  };

  render = () => {
    const { size, margin, data, classes, theme } = this.props;
    const { width } = size;
    const { height, contentWidth, contentHeight, xScale, yScale } = this.state;

    return (
      <div>
        <Typography variant="caption">
          <span style={{ marginLeft: margin.left }}>
            Deaths per 1000 live births
          </span>
        </Typography>
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <g>
              <Area
                data={data[2].datapoints}
                xScale={xScale}
                yScale={yScale}
                color={theme.palette.secondary.dark}
                classes={classes}
              />
            </g>
            <g>
              <Axis
                orient="Left"
                scale={yScale}
                ticks={20}
                tickSize={-contentWidth}
                classes={classes}
              />
              <Axis
                orient="Bottom"
                scale={xScale}
                translate={`translate(0, ${contentHeight})`}
                ticks={10}
                tickSize={-contentHeight}
                classes={classes}
              />
            </g>
            <g>
              <Line
                data={data[0].datapoints}
                xScale={xScale}
                yScale={yScale}
                color={theme.palette.primary.main}
                classes={classes}
              />
              <Line
                data={data[1].datapoints}
                xScale={xScale}
                yScale={yScale}
                color={theme.palette.primary.main}
              />
            </g>
          </g>
        </svg>
      </div>
    );
  };
}

Chart.defaultProps = {
  margin: { top: 10, right: 1, bottom: 20, left: 40 },
};

export default compose(withStyles(style, { withTheme: true }), withSize())(
  Chart,
);
