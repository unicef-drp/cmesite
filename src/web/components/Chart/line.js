import React from 'react';
import PropTypes from 'prop-types';
import { prop, pipe, both, map, not, addIndex } from 'ramda';
import { line as d3Line, curveMonotoneX } from 'd3-shape';
import { symbolGenerator } from './utils';

class Line extends React.Component {
  defined = both(prop('x'), prop('y'));

  state = {
    line: d3Line().defined(this.defined),
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { xScale, yScale, hasSymbols } = nextProps;
    let { line } = prevState;

    const xScaleGetter = pipe(prop('x'), xScale);
    const yScaleGetter = pipe(prop('y'), yScale);

    line
      .x(xScaleGetter)
      .y(yScaleGetter)
      .curve(curveMonotoneX);

    if (not(hasSymbols)) return { ...prevState, line };

    return {
      ...prevState,
      line,
      symbol: symbolGenerator(30)(),
      xScaleGetter,
      yScaleGetter,
    };
  };

  render = () => (
    <React.Fragment>
      <path
        d={this.state.line(this.props.data)}
        className={prop('line')(this.props.classes)}
        stroke={this.props.color}
        fill="none"
      />
      {this.props.hasSymbols
        ? addIndex(map)((d, i) => {
            if (!this.defined(d)) return null;

            const x = this.state.xScaleGetter(d);
            const y = this.state.yScaleGetter(d);

            return (
              <path
                key={i}
                d={this.state.symbol}
                transform={`translate(${x},${y})`}
                stroke={this.props.color}
                fill={this.props.symbolFill}
                onMouseOver={() => {
                  clearTimeout(this.antiBlink);
                  this.props.setTooltip({ x, y, d });
                }}
                onMouseOut={() => {
                  this.antiBlink = setTimeout(() => this.props.setTooltip(), 1000);
                }}
              />
            );
          }, this.props.data)
        : null}
    </React.Fragment>
  );
}

Line.propTypes = {
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  data: PropTypes.array,
  classes: PropTypes.object,
  color: PropTypes.string,
  hasSymbols: PropTypes.bool,
  symbolFill: PropTypes.string,
  setTooltip: PropTypes.func.isRequired,
};

Line.defaultProps = {
  data: [],
  symbolShape: 'none',
};

export default Line;
