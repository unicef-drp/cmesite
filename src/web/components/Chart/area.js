import React from 'react';
import PropTypes from 'prop-types';
import { prop, pipe, allPass } from 'ramda';
import { area as d3Area, curveLinear } from 'd3-shape';

class Area extends React.Component {
  state = {
    area: d3Area().defined(allPass([prop('x'), prop('y0'), prop('y1')])),
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { xScale, yScale } = nextProps;
    let { area } = prevState;

    area
      .x(pipe(prop('x'), xScale))
      .y0(pipe(prop('y0'), yScale))
      .y1(pipe(prop('y1'), yScale))
      .curve(curveLinear);

    return { ...prevState, area };
  };

  render = () => (
    <path
      d={this.state.area(this.props.data)}
      className={prop('area')(this.props.classes)}
      stroke={this.props.color}
      fill={this.props.color}
    />
  );
}

Area.propTypes = {
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  data: PropTypes.array,
  classes: PropTypes.object,
  color: PropTypes.string,
};

Area.defaultProps = {
  data: [],
};

export default Area;
