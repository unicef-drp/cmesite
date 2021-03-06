import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {
  compose,
  map,
  addIndex,
  ifElse,
  isNil,
  always,
  prop,
  lte,
  indexOf,
  propEq,
  any,
  pipe,
  values,
  identity,
} from 'ramda';
import { scaleLinear, scaleTime } from 'd3-scale';
import { zoom, zoomTransform as d3ZoomTransform, zoomIdentity } from 'd3-zoom';
import { select } from 'd3-selection';
// import { timeFormat } from 'd3-time-format';
import numeral from 'numeral';
import { withSize } from 'react-sizeme';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { getSymbolFill, getClass, hasSymbols, getColor, getExtents } from './utils';
import Axis from './axis';
import Line from './line';
import Area from './area';
import Tooltip from './tooltip';
import { INCLUDED, EXCLUDED, SERIES_METHOD } from '../../constants';

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
  axisTop: {
    '& path': {
      display: 'none',
    },
    '& line': {
      stroke: theme.palette.primary.dark,
      strokeDasharray: '1 3',
    },
  },
  estimate: {
    strokeWidth: 2,
  },
  in: {
    strokeWidth: 1,
  },
  ex: {
    strokeWidth: 1,
    strokeDasharray: '5 5',
  },
  resetZoom: {
    position: 'absolute',
    top: theme.spacing.unit * 5,
    right: theme.spacing.unit * 2,
    textTransform: 'none',
  },
  model: {
    paddingRight: theme.spacing.unit,
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
    const contentHeight = Math.floor(height - nextProps.margin.top - nextProps.margin.bottom);

    const { estimateSeries, mergedSeries, previousEstimateSeries } = nextProps;
    const includedSeries = prop(INCLUDED, mergedSeries);
    const excludedSeries = prop(EXCLUDED, mergedSeries);
    const extents = getExtents(
      estimateSeries,
      previousEstimateSeries,
      includedSeries,
      excludedSeries,
    );

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
      extents,
    };
  };

  zoomed = () => {
    this.setState({ zoomTransform: d3ZoomTransform(this.chartElement) });
  };

  resetZoom = () => {
    select(this.chartElement)
      .transition()
      .duration(750)
      .call(this.zoom.transform, zoomIdentity);
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
      previousEstimateSeries,
      mergedSeries,
      isCompare,
      seriesNames,
      hasHighlights,
      seriesUnit,
      highlightedMethods,
      model,
    } = this.props;

    const { width } = size;
    const { height, contentWidth, contentHeight, xScale, yScale } = this.state;
    const ticks = isWidthUp('sm', this.props.width) ? 10 : 8;
    const hasHighlightedMethods = pipe(values, any(identity))(highlightedMethods);

    const areas = uncertaintySeries
      ? map(
          ({ id, datapoints, isHighlighted }) => (
            <Area
              key={id}
              data={datapoints}
              xScale={xScale}
              yScale={yScale}
              color={theme.palette.secondary.darker}
              bgColor={theme.palette.secondary.dark}
              classes={classes}
              setTooltip={this.setTooltip}
              isHighlighted={isHighlighted}
              hasHighlights={hasHighlights || hasHighlightedMethods}
            />
          ),
          uncertaintySeries,
        )
      : null;

    const linesFactory = ifElse(
      isNil,
      always(null),
      addIndex(map)(({ id, name, datapoints, type, isHighlighted, ...serie }, index) => (
        <Line
          key={id}
          type={type}
          data={datapoints}
          xScale={xScale}
          yScale={yScale}
          color={getColor({
            type: isCompare ? null : type,
            index: isCompare ? index : indexOf(name, seriesNames),
            theme,
          })}
          classes={getClass(type, classes)}
          hasSymbols={hasSymbols(type)}
          symbolFill={getSymbolFill(
            //isCompare ? null : type,
            isCompare ? index : indexOf(name, seriesNames),
            theme,
          )}
          setTooltip={this.setTooltip}
          isHighlighted={
            isHighlighted || propEq(prop(SERIES_METHOD, serie), true, highlightedMethods)
          }
          hasHighlights={hasHighlights || hasHighlightedMethods}
        />
      )),
    );

    return (
      <div>
        {/* div is required for withSize to work properly */}

        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Typography variant="caption">{seriesUnit}</Typography>
          </Grid>
          {model && (
            <Grid item xs={6}>
              <Typography variant="caption" className={classes.model} align="right">
                <FormattedMessage {...messages.model} />
                {model}
              </Typography>
            </Grid>
          )}
        </Grid>

        <Button variant="contained" onClick={this.resetZoom} className={classes.resetZoom}>
          <FormattedMessage {...messages.resetZoom} />
        </Button>

        <svg width={width} height={height} ref={el => (this.chartElement = el)}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {contentWidth < 0 || contentHeight < 0 ? null : (
              <defs>
                <clipPath id="clip">
                  <rect x="0" y="0" width={contentWidth} height={contentHeight} />
                </clipPath>
              </defs>
            )}
            <g>
              <Axis
                orient="Left"
                scale={yScale}
                ticks={ticks}
                tickSize={-contentWidth}
                tickFormat={ifElse(lte(0), n => numeral(n).format('0a'), always(''))}
                classes={classes}
              />
              <Axis
                orient="Bottom"
                scale={xScale}
                translate={`translate(0, ${contentHeight})`}
                ticks={ticks}
                tickSize={-contentHeight}
                classes={classes}
              />
            </g>
            {/*<Axis
              orient="Top"
              scale={xScale}
              translate="translate(0, 0)"
              tickValues={prop('x', extents)}
              tickSize={-contentHeight}
              classes={classes}
              tickFormat={always('')}
              tickPadding={2}
            />*/
            /* alternative tickFormat timeFormat('%Y')*/}
            <g clipPath="url(#clip)">
              {areas}
              {linesFactory(prop(INCLUDED, mergedSeries))}
              {linesFactory(prop(EXCLUDED, mergedSeries))}
              {linesFactory(estimateSeries)}
              {linesFactory(previousEstimateSeries)}
            </g>
          </g>
        </svg>
        {this.state.tooltip && (
          <Tooltip
            isCompare={isCompare}
            {...this.state.tooltip}
            width={this.state.contentWidth}
            height={this.state.contentHeight}
          />
        )}
      </div>
    );
  };
}

Chart.propTypes = {
  size: PropTypes.object.isRequired,
  margin: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  estimateSeries: PropTypes.array,
  previousEstimateSeries: PropTypes.array,
  uncertaintySeries: PropTypes.array,
  mergedSeries: PropTypes.object,
  isCompare: PropTypes.bool,
  seriesNames: PropTypes.array,
  hasHighlights: PropTypes.bool,
  seriesUnit: PropTypes.string,
  width: PropTypes.string,
  highlightedMethods: PropTypes.object.isRequired,
  model: PropTypes.string,
};

Chart.defaultProps = {
  margin: { top: 10, right: 10, bottom: 20, left: 30 },
};

export default compose(withWidth(), withStyles(style, { withTheme: true }), withSize())(Chart);
