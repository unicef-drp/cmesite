import React from 'react';
import PropTypes from 'prop-types';
import { prop, pipe, both } from 'ramda';
import { line as d3Line } from 'd3-shape';

class Line extends React.Component {
  state = {
    line: d3Line().defined(both(prop('x'), prop('y'))),
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { xScale, yScale } = nextProps;
    let { line } = prevState;

    line.x(pipe(prop('x'), xScale)).y(pipe(prop('y'), yScale));

    return { ...prevState, line };
  };

  render = () => (
    <path
      d={this.state.line(this.props.data)}
      className={prop('line')(this.props.classes)}
      stroke={this.props.color}
      fill="none"
    />
  );
}

Line.propTypes = {
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  data: PropTypes.array,
  classes: PropTypes.object,
  color: PropTypes.string,
};

Line.defaultProps = {
  data: [],
};

export default Line;
