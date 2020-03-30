import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import cx from 'classnames';
import { select } from 'd3-selection';
import { scaleLinear, scaleBand, scaleOrdinal } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { zoom, zoomTransform, zoomIdentity } from 'd3-zoom';
import { line, curveLinear } from 'd3-shape';
import { max } from 'd3-array';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import useResizeObserver from '../../hooks/useResizeObserver';
import data, { REGIONS } from './data';

function wrap(text, width) {
  text.each(function() {
    var text = select(this),
      words = text
        .text()
        .split(/\s+/)
        .reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.1, // ems
      y = text.attr('y'),
      x = text.attr('x'),
      dy = parseFloat(text.attr('dy')),
      tspan = text
        .text(null)
        .append('tspan')
        .attr('x', x)
        .attr('y', y)
        .attr('dy', dy + 'em');
    while ((word = words.pop())) {
      /* eslint-disable-line no-cond-assign */
      line.push(word);
      tspan.text(line.join(' '));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(' '));
        line = [word];
        tspan = text
          .append('tspan')
          .attr('x', x)
          .attr('y', y)
          .attr('dy', ++lineNumber * lineHeight + dy + 'em')
          .text(word);
      }
    }
  });
}

const REGION = 'region';
const COUNTRY = 'country';

const getContentDimensions = (dimensions, margin) => {
  if (R.isNil(dimensions)) return;
  return {
    width: Math.floor(dimensions.width - margin.left - margin.right),
    height: Math.floor(dimensions.height - margin.top - margin.bottom),
  };
};

const styles = theme => ({
  resetZoom: {
    position: 'absolute',
    top: theme.spacing.unit * 2,
    right: theme.spacing.unit,
    textTransform: 'none',
  },
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
});

function CircleChart({ classes, theme, serie }) {
  const margin = { top: 10, bottom: 20, left: 80, right: 0 };
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
  const threshold = 27;
  const max = 380;
  const min = -20;
  const regions = R.pipe(R.filter(R.propEq('areaType', REGION)), R.pluck('regionId'))(data);

  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const contentDimensions = getContentDimensions(dimensions, margin);
  const [currentZoom, setCurrentZoom] = useState();
  const [resetZoom, setResetZoom] = useState(false);

  useEffect(
    () => {
      const svg = select(svgRef.current);
      const svgContent = svg.select('.content');
      const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();
      const contentDimensions = getContentDimensions({ width, height }, margin);

      const xScale = scaleLinear()
        .domain([min, max])
        .range([0, contentDimensions.width]);

      const yScale = scaleBand()
        .domain(regions)
        .paddingInner(1)
        .paddingOuter(0.5)
        .range([contentDimensions.height, 0]);

      if (currentZoom) xScale.domain(currentZoom.rescaleX(xScale).domain());

      // borders
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

      svgContent
        .selectAll('.border-right')
        .data([0])
        .join('line')
        .attr('class', 'line border-right')
        .attr('x1', contentDimensions.width)
        .attr('y1', 0)
        .attr('x2', contentDimensions.width)
        .attr('y2', contentDimensions.height)
        .attr('stroke', theme.palette.secondary.darker);

      // threshold
      svgContent
        .selectAll('.threshold')
        .data([threshold])
        .join('line')
        .attr('class', 'line threshold')
        .attr('x1', xScale)
        .attr('y1', 0)
        .attr('x2', xScale)
        .attr('y2', contentDimensions.height)
        .attr('stroke-dasharray', '3 3')
        .attr('stroke', theme.palette.secondary.darker);

      // circles
      svgContent
        .selectAll('.circle')
        .data(data)
        .join('circle')
        .attr('class', 'circle')
        .attr(
          'stroke',
          ({ regionId, areaType }) => (R.equals(areaType, REGION) ? 'black' : colorScale(regionId)),
        )
        .attr('r', 12)
        .attr(
          'fill',
          ({ regionId, areaType }) => (R.equals(areaType, REGION) ? 'none' : colorScale(regionId)),
        )
        .attr('fill-opacity', 0.7)
        .attr('cx', ({ value }) => xScale(value))
        .attr('cy', ({ regionId }) => yScale(regionId));

      // axes
      const xAxis = axisBottom(xScale).tickSizeOuter(0);
      svg
        .select('.x-axis')
        .attr('transform', `translate(0, ${contentDimensions.height})`)
        .call(xAxis);

      const yAxis = axisLeft(yScale)
        .tickFormat((d, i) => R.pipe(R.nth(i), R.prop('label'))(R.reverse(REGIONS)))
        .tickSizeOuter(0);
      svg
        .select('.y-axis')
        .call(yAxis)
        .selectAll('.tick text')
        .call(wrap, margin.left - 10);

      // zoom
      const zoomBehavior = zoom()
        .scaleExtent([1, 6])
        .on('zoom', () => {
          setCurrentZoom(zoomTransform(svg.node()));
        });

      svg.call(zoomBehavior);
    },
    [resetZoom, currentZoom, data, dimensions],
  );

  return (
    <div ref={wrapperRef} style={{ height: 400, position: 'relative' }}>
      <Button
        variant="contained"
        size="small"
        onClick={() => setResetZoom(true)}
        className={classes.resetZoom}
      >
        <FormattedMessage {...messages.resetZoom} />
      </Button>
      <svg ref={svgRef} width="100%" height="100%">
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {R.isNil(contentDimensions) ? null : (
            <defs>
              <clipPath id="clip">
                <rect
                  x="0"
                  y="0"
                  width={contentDimensions.width}
                  height={contentDimensions.height}
                />
              </clipPath>
            </defs>
          )}
          <g className="content" clipPath="url(#clip)" />
          <g className={cx(classes.axis, 'x-axis')} />
          <g className={cx(classes.axis, 'y-axis')} />
        </g>
      </svg>
    </div>
  );
}

CircleChart.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  serie: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(CircleChart);
