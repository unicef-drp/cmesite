import React from 'react';
import PropTypes from 'prop-types';
import { prop, pipe, allPass, map, addIndex } from 'ramda';
import { area as d3Area, curveLinear } from 'd3-shape';
import { select } from 'd3-selection';
import { getSymbol, getOpacity } from './utils';

class Area extends React.Component {
  state = {
    area: d3Area().defined(allPass([prop('x'), prop('y0'), prop('y1')])),
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { xScale, yScale } = nextProps;
    let { area } = prevState;

    const xScaleGetter = pipe(prop('x'), xScale);
    const y0ScaleGetter = pipe(prop('y0'), yScale);
    const y1ScaleGetter = pipe(prop('y1'), yScale);

    area
      .x(xScaleGetter)
      .y0(y0ScaleGetter)
      .y1(y1ScaleGetter)
      .curve(curveLinear);

    return {
      ...prevState,
      area,
      xScaleGetter,
      y1ScaleGetter,
    };
  };

  render = () => (
    <React.Fragment>
      <path
        d={this.state.area(this.props.data)}
        className={prop('area')(this.props.classes)}
        stroke={this.props.bgColor}
        strokeOpacity={getOpacity(this.props)}
        fill={this.props.bgColor}
        fillOpacity={getOpacity(this.props)}
      />
      {addIndex(map)((d, i) => {
        const x = this.state.xScaleGetter(d);
        const y = this.state.y1ScaleGetter(d);

        // over marker
        return (
          <path
            key={`marker-${i}`}
            d={getSymbol({ size: 60 })()}
            transform={`translate(${x},${y})`}
            fill="transparent"
            onMouseOver={event => {
              select(event.target).attr('fill', this.props.color);
              this.props.setTooltip({ x, y, d, isUncertainty: true, color: this.props.color });
            }}
            onMouseOut={event => {
              select(event.target).attr('fill', 'transparent');
              this.props.setTooltip();
            }}
          />
        );
      }, this.props.data)}
    </React.Fragment>
  );
}

Area.propTypes = {
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  data: PropTypes.array,
  classes: PropTypes.object,
  color: PropTypes.string,
  bgColor: PropTypes.string,
  setTooltip: PropTypes.func.isRequired,
  hasHighlights: PropTypes.bool,
  isHighlighted: PropTypes.bool,
};

Area.defaultProps = {
  data: [],
};

export default Area;
