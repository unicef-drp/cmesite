import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prop } from 'ramda';
import { select } from 'd3-selection';
import * as d3Axis from 'd3-axis';

/* React and D3 both need to manipulate the DOM.
 * With latest versions of each, it sounds better to rely on D3 for computations like scales
 * and on React for rendering.
 * There is an exception, axis.
 * Since it is a complex D3 object, D3 knows better how to render it efficiently.
 */

class Axis extends React.Component {
  componentDidMount = () => this.renderAxis();

  componentDidUpdate = () => this.renderAxis();

  getAxisName = prop(`axis${this.props.orient}`);

  renderAxis = () => {
    const axis = this.getAxisName(d3Axis)(this.props.scale)
      .tickSize(this.props.tickSize)
      .tickPadding(this.props.tickPadding);

    if (this.props.tickFormat) axis.tickFormat(this.props.tickFormat);
    if (this.props.ticks) axis.ticks(this.props.ticks);
    if (this.props.tickValues) axis.tickValues(this.props.tickValues);

    select(this.axisElement).call(axis);
  };

  render = () => (
    <g
      className={classNames(prop('axis')(this.props.classes), this.getAxisName(this.props.classes))}
      ref={el => (this.axisElement = el)}
      transform={this.props.translate}
    />
  );
}

Axis.propTypes = {
  scale: PropTypes.func.isRequired,
  tickFormat: PropTypes.func,
  orient: PropTypes.oneOf(['Top', 'Right', 'Bottom', 'Left']),
  translate: PropTypes.string,
  ticks: PropTypes.number,
  tickSize: PropTypes.number,
  tickPadding: PropTypes.number,
  tickValues: PropTypes.array,
  classes: PropTypes.object,
};

Axis.defaultProps = {
  tickPadding: 6,
};

export default Axis;
