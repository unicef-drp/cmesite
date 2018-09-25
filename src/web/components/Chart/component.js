/* eslint-disable react/prop-types */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose, map, addIndex, not } from 'ramda';
import { scaleLinear, scaleTime } from 'd3-scale';
import { withSize } from 'react-sizeme';
import { getSymbolFill, getClass } from './utils';
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
  estimates: {
    strokeWidth: 2,
  },
  included: {
    strokeWidth: 1,
  },
  excluded: {
    strokeWidth: 1,
    strokeDasharray: '5 5',
  },
});

export class Chart extends React.Component {
  state = {
    xScale: scaleTime(),
    yScale: scaleLinear(),
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    let { xScale, yScale } = prevState;

    const height = nextProps.size.width / 1.77;

    const contentWidth = Math.floor(
      nextProps.size.width - nextProps.margin.left - nextProps.margin.right,
    );
    const contentHeight = Math.floor(
      height - nextProps.margin.top - nextProps.margin.bottom,
    );

    xScale
      .domain([new Date(1985, 0, 1), new Date(2016, 0, 1)])
      .range([0, contentWidth])
      .nice();
    yScale
      .domain([0, 260])
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
    const { size, margin, classes, theme, series, estimates } = this.props;
    const { width } = size;
    const { height, contentWidth, contentHeight, xScale, yScale } = this.state;

    return (
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g>
            {estimates
              ? map(
                  ({ id, datapoints }) => (
                    <Area
                      key={id}
                      data={datapoints}
                      xScale={xScale}
                      yScale={yScale}
                      color={theme.palette.secondary.dark}
                      classes={classes}
                    />
                  ),
                  estimates,
                )
              : null}
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
            {addIndex(map)(({ id, datapoints, type, isEstimate }, index) => {
              const color = isEstimate
                ? theme.palette.primary.main
                : theme.palette.chartColorScale(index);
              return (
                <Line
                  key={id}
                  data={datapoints}
                  xScale={xScale}
                  yScale={yScale}
                  color={color}
                  classes={getClass(type, isEstimate, classes)}
                  hasSymbols={not(isEstimate)}
                  symbolFill={getSymbolFill(type, color)}
                />
              );
            }, series)}
          </g>
        </g>
      </svg>
    );
  };
}

Chart.defaultProps = {
  margin: { top: 10, right: 1, bottom: 20, left: 25 },
};

export default compose(withStyles(style, { withTheme: true }), withSize())(Chart);
