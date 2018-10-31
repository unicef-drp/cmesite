import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose, map, addIndex, ifElse, isNil, always, prop } from 'ramda';
import { scaleLinear, scaleTime } from 'd3-scale';
import { withSize } from 'react-sizeme';
import { getSymbolFill, getClass, hasSymbols, getColor, getExtents } from './utils';
import Axis from './axis';
import Line from './line';
import Area from './area';
import Tooltip from './tooltip';

const style = theme => ({
  axis: {
    '& path': {
      stroke: theme.palette.secondary.dark,
      shapeRendering: 'auto',
    },
    '& line': {
      stroke: theme.palette.secondary.dark,
      shapeRendering: 'auto',
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
  estimate: {
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
    tooltip: null,
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    let { xScale, yScale } = prevState;

    const height = Math.ceil(nextProps.size.width / 1.77);

    const contentWidth = Math.floor(
      nextProps.size.width - nextProps.margin.left - nextProps.margin.right,
    );
    const contentHeight = Math.floor(
      height - nextProps.margin.top - nextProps.margin.bottom,
    );

    const { estimateSeries, includedSeries, excludedSeries } = nextProps;
    const extents = getExtents(estimateSeries, includedSeries, excludedSeries);

    xScale
      .domain(prop('x', extents))
      .range([0, contentWidth])
      .nice();
    yScale
      .domain(prop('y', extents))
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

  setTooltip = tooltip => this.setState({ tooltip });

  render = () => {
    const {
      size,
      margin,
      classes,
      theme,
      uncertaintySeries,
      estimateSeries,
      includedSeries,
      excludedSeries,
    } = this.props;

    const { width } = size;
    const { height, contentWidth, contentHeight, xScale, yScale } = this.state;

    const areas = uncertaintySeries
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
          uncertaintySeries,
        )
      : null;

    const linesFactory = ifElse(
      isNil,
      always(null),
      addIndex(map)(({ id, datapoints, type }, index) => (
        <Line
          key={id}
          data={datapoints}
          xScale={xScale}
          yScale={yScale}
          color={getColor(type, index, theme)}
          classes={getClass(type, classes)}
          hasSymbols={hasSymbols(type)}
          symbolFill={getSymbolFill(type, index, theme)}
          setTooltip={this.setTooltip}
        />
      )),
    );

    return (
      <div>
        {/* div is required for withSize to work properly */}
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <g>{areas}</g>
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
              {linesFactory(estimateSeries)}
              {linesFactory(includedSeries)}
              {linesFactory(excludedSeries)}
            </g>
          </g>
        </svg>
        {this.state.tooltip && <Tooltip {...this.state.tooltip} />}
      </div>
    );
  };
}

Chart.defaultProps = {
  margin: { top: 10, right: 1, bottom: 20, left: 25 },
};

export default compose(withStyles(style, { withTheme: true }), withSize())(Chart);
