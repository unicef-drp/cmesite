import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { select } from 'd3-selection';
import { scaleLinear, scaleBand, scaleOrdinal } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { zoom, zoomTransform, zoomIdentity } from 'd3-zoom';
import { line, curveLinear } from 'd3-shape';
import { max } from 'd3-array';
import useResizeObserver from '../../hooks/useResizeObserver';

const REGION = 'region';
const COUNTRY = 'country';

function CircleChart({ serie, id = 'circleChart' }) {
  const marginTop = 10;
  const marginBottom = 20;
  const marginLeft = 60;
  const marginRight = 10;
  const colorScale = scaleOrdinal([
    '#8362d4',
    '#5cc151',
    '#c24fb6',
    '#a2b636',
    '#6c7ad1',
    '#d89a32',
    '#5d99d2',
    '#cf4b33',
    '#3fc1bf',
  ]);
  const data = [
    { value: 50, region: 'America', areaType: REGION, label: 0 },
    { value: 100, region: 'America', areaType: COUNTRY, label: 1 },
    { value: 20, region: 'America', areaType: COUNTRY, label: 2 },
    { value: 200, region: 'America', areaType: COUNTRY, label: 3 },
    { value: 70, region: 'Europe', areaType: REGION, label: 0 },
    { value: 100, region: 'Europe', areaType: COUNTRY, label: 1 },
    { value: 50, region: 'Europe', areaType: COUNTRY, label: 2 },
    { value: 250, region: 'Europe', areaType: COUNTRY, label: 3 },
    { value: 50, region: 'Asia', areaType: REGION, label: 0 },
    { value: 100, region: 'Asia', areaType: COUNTRY, label: 1 },
    { value: 20, region: 'Asia', areaType: COUNTRY, label: 2 },
    { value: 200, region: 'Asia', areaType: COUNTRY, label: 3 },
    { value: 70, region: 'Africa', areaType: REGION, label: 0 },
    { value: 100, region: 'Africa', areaType: COUNTRY, label: 1 },
    { value: 50, region: 'Africa', areaType: COUNTRY, label: 2 },
    { value: 250, region: 'Africa', areaType: COUNTRY, label: 3 },
  ];
  const max = 300;
  const min = 0;
  const regions = R.pipe(R.filter(R.propEq('areaType', REGION)), R.pluck('region'))(data);

  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [currentZoomState, setCurrentZoomState] = useState();

  // will be called initially and on every data change
  useEffect(
    () => {
      const svg = select(svgRef.current);
      const svgContent = svg.select('.content');
      const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();

      const xScale = scaleLinear()
        .domain([0, max])
        .range([marginLeft, width - marginRight])
        .nice();
      const yScale = scaleBand()
        .domain(regions)
        .paddingInner(1)
        .paddingOuter(0.2)
        //.align(0.5)
        .range([marginTop, height - marginBottom]);

      /*const lineGenerator = line()
      .x((d, index) => xScale(index))
      .y(d => yScale(d))
      .curve(curveLinear);*/

      if (currentZoomState) {
        xScale.domain(currentZoomState.rescaleX(xScale).domain());
        //yScale.domain(currentZoomState.rescaleY(yScale).domain());
      }

      // render the line
      /*svgContent
      .selectAll(".myLine")
      .data([data])
      .join("path")
      .attr("class", "myLine")
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("d", lineGenerator);*/

      svgContent
        .selectAll('.circle')
        .data(data)
        .join('circle')
        .attr('class', 'circle')
        .attr(
          'stroke',
          ({ region, areaType }) => (R.equals(areaType, REGION) ? 'black' : colorScale(region)),
        )
        .attr('r', 20)
        .attr(
          'fill',
          ({ region, areaType }) => (R.equals(areaType, REGION) ? 'none' : colorScale(region)),
        )
        .attr('fill-opacity', 0.4)
        .attr('cx', ({ value }) => xScale(value))
        .attr('cy', ({ region }) => yScale(region));

      // axes
      const xAxis = axisBottom(xScale);
      svg
        .select('.x-axis')
        .attr('transform', `translate(0, ${height - marginBottom})`)
        .call(xAxis);

      const yAxis = axisLeft(yScale);
      svg
        .select('.y-axis')
        .attr('transform', `translate(${marginLeft}, 0)`)
        .call(yAxis);

      // zoom
      const zoomBehavior = zoom()
        .scaleExtent([1, 4])
        .on('zoom', () => {
          const zoomState = zoomTransform(svg.node());
          setCurrentZoomState(zoomState);
        });

      svg.call(zoomBehavior);
    },
    [currentZoomState, data, dimensions],
  );

  return (
    <React.Fragment>
      <div
        ref={wrapperRef}
        style={{ border: '1px solid black', height: 500, margin: 20, padding: 20 }}
      >
        <svg ref={svgRef} width="100%" height="100%">
          <defs>
            <clipPath id={id}>
              <rect x="0" y="0" width="100%" height="100%" />
            </clipPath>
          </defs>
          <g className="content" clipPath={`url(#${id})`} />
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </React.Fragment>
  );
}

CircleChart.propTypes = {
  id: PropTypes.string,
  serie: PropTypes.object.isRequired,
};

export default CircleChart;
