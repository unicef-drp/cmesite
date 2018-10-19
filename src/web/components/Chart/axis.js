import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prop } from 'ramda';
import { select } from 'd3-selection';
import * as axis from 'd3-axis';

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

  renderAxis = () =>
    select(this.axisElement).call(
      this.getAxisName(axis)(this.props.scale)
        .tickPadding(6)
        .tickSize(this.props.tickSize)
        .ticks(10),
    );

  render = () => (
    <g
      className={classNames(
        prop('axis')(this.props.classes),
        this.getAxisName(this.props.classes),
      )}
      ref={el => {
        this.axisElement = el;
      }}
      transform={this.props.translate}
    />
  );
}

Axis.propTypes = {
  scale: PropTypes.func.isRequired,
  orient: PropTypes.oneOf(['Top', 'Right', 'Bottom', 'Left']),
  translate: PropTypes.string,
  ticks: PropTypes.number,
  tickSize: PropTypes.number,
  classes: PropTypes.object,
};

export default Axis;
