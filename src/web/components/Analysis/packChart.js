import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import cx from 'classnames';
import { select, mouse } from 'd3-selection';
import { min, max } from 'd3-array';
import { scaleTime, scaleBand, scaleOrdinal, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force';
import { withStyles } from '@material-ui/core/styles';
import useResizeObserver from '../../hooks/useResizeObserver';
import Tooltip from './tooltip';
import {
  REF_AREA,
  REGION,
  YEAR_TO_ACHIEVE,
  DEFAULT_ANALYSIS_PROGRESS_TARGET,
  UNICEF_REGIONS,
} from '../../constants';
import { wrapText } from '../../lib/charts';

const getContentDimensions = (dimensions, margin) => {
  if (R.isNil(dimensions)) return;
  return {
    width: Math.floor(dimensions.width - margin.left - margin.right),
    height: Math.floor(dimensions.height - margin.top - margin.bottom),
  };
};

const getYearToAchieve = id =>
  R.pipe(R.path([id, YEAR_TO_ACHIEVE, 'valueName']), R.match(/\d+/), R.head);

const styles = theme => ({
  axis: {
    '& path': {
      stroke: theme.palette.secondary.darker,
      shapeRendering: 'auto',
    },
    '& line': {
      stroke: theme.palette.secondary.darker,
      shapeRendering: 'auto',
    },
    '& text': {
      fill: theme.palette.secondary.darker,
      userSelect: 'none',
    },
  },
  yaxis: {
    '& path': {
      stroke: 'none',
    },
    '& line': {
      strokeDasharray: '1,2',
      stroke: theme.palette.secondary.dark,
    },
  },
});

function PackChart({ classes, theme, serie, aggregate, boundaries, target, indicatorValueId }) {
  const margin = { top: 10, bottom: 20, left: 160, right: 0 };
  const colorScale = scaleOrdinal([
    '#9BD5A4',
    '#F2E388',
    '#A0A9C9',
    '#93DAD7',
    '#55B7AF',
    '#FEE7E3',
    '#FFC7BE',
    '#CAECF8',
    '#4EC0E8',
  ]);

  const codes = R.pipe(R.prop('codes'), R.values)(aggregate);
  //const regions = R.pipe(R.filter(R.propEq('areaType', REGION)), R.pluck('regionId'))(codes);
  const regions = R.reverse(R.pluck('id', UNICEF_REGIONS));
  const datapoints = R.prop('datapoints', serie);
  const data = R.reject(R.propEq('areaType', REGION), codes);

  const yBoundaries = R.pipe(
    R.pick(R.keys(R.prop('codes', aggregate))),
    R.pluck('y'),
    R.values,
    values => [min(values), max(values)],
  )(datapoints);

  const legend = [10, 20, 50, 70];

  const svgRef = useRef();
  const wrapperRef = useRef();
  const tooltipRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const contentDimensions = getContentDimensions(dimensions, margin);
  const [tooltipPosition, setTooltipPosition] = useState();
  const [tooltipDatum, setTooltipDatum] = useState();

  useEffect(
    () => {
      const svg = select(svgRef.current);
      const svgContent = svg.select('.content');
      const svgTarget = svg.select('.target');
      const svgLegend = svg.select('.legend');
      const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();
      const contentDimensions = getContentDimensions({ width, height }, margin);

      const xScale = scaleTime()
        .domain(boundaries)
        .range([0, contentDimensions.width]);

      const yScale = scaleBand()
        .domain(regions)
        .paddingInner(1)
        .paddingOuter(1.5)
        .range([contentDimensions.height, 0]);

      const rScale = scaleLinear()
        .domain(yBoundaries)
        .range([2, 9]);

      const cx = ({ id }) => xScale(R.pipe(getYearToAchieve(id), y => new Date(y, 0))(datapoints));
      const cy = ({ regionId }) => yScale(regionId);
      const cr = ratio => ({ id }) => ratio * rScale(R.path([id, 'y'], datapoints));

      svgContent.on('mousemove', function() {
        const spacer = 16;
        const { width, height } = tooltipRef.current.getBoundingClientRect();

        const [x, y] = mouse(this);
        const edgeX = R.gt(x + width + spacer, contentDimensions.width);
        const edgeY = R.gt(y + height + spacer, contentDimensions.height);

        setTooltipPosition({
          [edgeX ? 'right' : 'left']: edgeX
            ? contentDimensions.width - x + margin.right
            : x + margin.left + spacer,
          [edgeY ? 'bottom' : 'top']: edgeY
            ? contentDimensions.height - y + margin.bottom
            : y + margin.top + spacer,
        });
      });

      svgContent
        .selectAll('.border-top')
        .data([0])
        .join('line')
        .attr('class', 'line border-top')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', contentDimensions.width)
        .attr('y2', 0)
        .attr('stroke', theme.palette.secondary.darker);

      R.addIndex(R.forEach)((value, index) => {
        svgLegend
          .selectAll(`.legend-circle-${index}`)
          .data([value])
          .join('circle')
          .attr('class', `legend-circle-${index}`)
          .attr('stroke', theme.palette.secondary.darker)
          .attr('fill', 'white')
          .attr('r', value => rScale(value))
          .attr('cx', () => contentDimensions.width - 40)
          .attr('cy', () => 20 + index * 2 * rScale(max(legend)));

        svgLegend
          .selectAll(`.legend-text-${index}`)
          .data([value])
          .join('text')
          .attr('class', `legend-text-${index}`)
          .attr('x', () => contentDimensions.width - 40)
          .attr('y', () => 20 + index * 2 * rScale(max(legend)))
          .attr('dy', 2.5)
          .attr('dx', 5 + rScale(max(legend)))
          .text(value)
          .attr('font-size', '.65em')
          .attr('fill', theme.palette.secondary.darker);
      }, legend);

      if (R.not(R.isNil(target))) {
        svgTarget
          .selectAll('.target-area')
          .data([DEFAULT_ANALYSIS_PROGRESS_TARGET])
          .join('rect')
          .attr('class', 'target-area')
          .attr('x', ({ startDate }) => xScale(startDate))
          .attr('y', 0)
          .attr('width', ({ startDate, endDate }) => xScale(endDate) - xScale(startDate))
          .attr('height', contentDimensions.height)
          .attr('fill', '#f7f7f7');

        R.addIndex(R.forEach)(
          (text, index) => {
            svgTarget
              .selectAll(`.target-text-${index}`)
              .data([text])
              .join('text')
              .attr('class', `target-text-${index}`)
              .attr('x', () => xScale(R.prop('endDate', DEFAULT_ANALYSIS_PROGRESS_TARGET)) - 4)
              .attr('y', () => contentDimensions.height - yScale.step() * 0.5 + index * 10)
              .text(text)
              .attr('font-size', '.65em')
              .attr('text-anchor', 'end')
              .attr('fill', theme.palette.secondary.darker);
          },
          ['Already achieved', 'SDG target', `(${indicatorValueId} <= ${target})`],
        );
      }

      const simulation = forceSimulation(data)
        .force('x', forceX(cx).strength(0.8))
        .force('y', forceY(cy))
        .force(
          'collision',
          forceCollide(12)
            .strength(1)
            .radius(cr(1.4)),
        )
        .stop();
      for (var i = 0; i < 120; ++i) simulation.tick();

      svgContent
        .selectAll('.circle')
        .data(data)
        .join('circle')
        .attr('class', 'circle')
        .attr('stroke', theme.palette.secondary.darker)
        .attr('fill', ({ regionId }) => colorScale(regionId))
        .attr('r', cr(1))
        .attr('cx', R.prop('x'))
        .attr('cy', R.prop('y'))
        .on('mouseenter', function({ id }) {
          //select(this).attr('r', 4);
          setTooltipDatum({
            value: R.path([id, 'y'], datapoints),
            label: R.path([id, REF_AREA, 'valueName'], datapoints),
            year: getYearToAchieve(id)(datapoints),
          });
        })
        .on('mouseleave', function() {
          //select(this).attr('r', 3);
          setTooltipDatum(null);
        });

      const xAxis = axisBottom(xScale).tickSizeOuter(0);
      svg
        .select('.x-axis')
        .attr('transform', `translate(0, ${contentDimensions.height})`)
        .call(xAxis);

      const yAxis = axisLeft(yScale)
        .tickFormat((_, index) => R.path([index, 'label'], R.reverse(UNICEF_REGIONS)))
        .tickSize(-contentDimensions.width)
        .tickSizeOuter(0);
      svg
        .select('.y-axis')
        .call(yAxis)
        .selectAll('.tick text')
        .call(wrapText, margin.left - 10);
    },
    [serie, dimensions, aggregate],
  );

  return (
    <div
      ref={wrapperRef}
      style={{ height: R.max(400, R.length(regions) * 64), position: 'relative' }}
    >
      <svg ref={svgRef} width="100%" height="100%">
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g className="target" />
          <g className={cx(classes.axis, 'x-axis')} />
          <g className={cx(classes.axis, classes.yaxis, 'y-axis')} />
          <g className="legend" />
          <g className="content" />
        </g>
      </svg>
      <div ref={tooltipRef} style={{ position: 'absolute', ...tooltipPosition }}>
        {tooltipDatum && <Tooltip datum={tooltipDatum} />}
      </div>
    </div>
  );
}

PackChart.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  serie: PropTypes.object.isRequired,
  aggregate: PropTypes.object.isRequired,
  boundaries: PropTypes.array.isRequired,
  target: PropTypes.number,
  indicatorValueId: PropTypes.string.isRequired,
};

export default withStyles(styles, { withTheme: true })(PackChart);
