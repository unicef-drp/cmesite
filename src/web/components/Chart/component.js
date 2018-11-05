import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose, map, addIndex, ifElse, isNil, always, prop } from 'ramda';
import { scaleLinear, scaleTime } from 'd3-scale';
import { zoom, zoomTransform as d3ZoomTransform } from 'd3-zoom';
import { select } from 'd3-selection';
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
      userSelect: 'none',
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

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      xScale: scaleTime(),
      yScale: scaleLinear(),
      tooltip: null,
      zoomTransform: null,
    };

    this.zoom = zoom()
      .scaleExtent([0.5, 4])
      .on('zoom', this.zoomed.bind(this));
  }

  componentDidMount = () => select(this.chartElement).call(this.zoom);

  componentDidUpdate = () => select(this.chartElement).call(this.zoom);

  static getDerivedStateFromProps = (nextProps, prevState) => {
    let { xScale, yScale, zoomTransform } = prevState;

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

    if (zoomTransform) {
      xScale.domain(zoomTransform.rescaleX(xScale).domain());
      yScale.domain(zoomTransform.rescaleY(yScale).domain());
    }

    return {
      ...prevState,
      height,
      contentWidth,
      contentHeight,
      xScale,
      yScale,
    };
  };

  zoomed = () => {
    this.setState({ zoomTransform: d3ZoomTransform(this.chartElement) });
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
        <svg width={width} height={height} ref={el => (this.chartElement = el)}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <defs>
              <clipPath id="clip">
                <rect x="0" y="0" width={contentWidth} height={contentHeight} />
              </clipPath>
            </defs>
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
            <g clipPath="url(#clip)">
              {areas}
              {linesFactory(includedSeries)}
              {linesFactory(excludedSeries)}
              {linesFactory(estimateSeries)}
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
