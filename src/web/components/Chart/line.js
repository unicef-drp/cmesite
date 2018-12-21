import React from 'react';
import PropTypes from 'prop-types';
import { prop, pipe, both, map, addIndex, path } from 'ramda';
import { line as d3Line, curveLinear } from 'd3-shape';
import { select } from 'd3-selection';
import { getSymbol, getSeriesMethodSymbol, isEstimate } from './utils';
import { SERIES_METHOD } from '../../constants';

class Line extends React.Component {
  defined = both(prop('x'), prop('y'));

  state = {
    line: d3Line().defined(this.defined),
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { xScale, yScale } = nextProps;
    let { line } = prevState;

    const xScaleGetter = pipe(prop('x'), xScale);
    const yScaleGetter = pipe(prop('y'), yScale);

    line
      .x(xScaleGetter)
      .y(yScaleGetter)
      .curve(curveLinear);

    return {
      ...prevState,
      line,
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
      {addIndex(map)((d, i) => {
        if (!this.defined(d)) return null;

        const x = this.state.xScaleGetter(d);
        const y = this.state.yScaleGetter(d);
        const method = path([SERIES_METHOD, 'valueId'], d);

        return (
          <React.Fragment key={`marker-${i}`}>
            {/* visible marker */}
            {this.props.hasSymbols && (
              <path
                d={
                  isEstimate(this.props.type) ? getSymbol()() : getSeriesMethodSymbol({ method })()
                }
                transform={`translate(${x},${y})`}
                stroke={this.props.color}
                fill={this.props.symbolFill}
              />
            )}
            {/* over marker */}
            <path
              d={
                isEstimate(this.props.type)
                  ? getSymbol({ size: 60 })()
                  : getSeriesMethodSymbol({ method, size: 60 })()
              }
              transform={`translate(${x},${y})`}
              fill="transparent"
              onMouseOver={event => {
                select(event.target).attr('fill', this.props.color);
                this.props.setTooltip({ x, y, d, color: this.props.color });
              }}
              onMouseOut={event => {
                select(event.target).attr('fill', 'transparent');
                this.props.setTooltip();
              }}
            />
          </React.Fragment>
        );
      }, this.props.data)}
    </React.Fragment>
  );
}

Line.propTypes = {
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  data: PropTypes.array,
  classes: PropTypes.object,
  color: PropTypes.string,
  type: PropTypes.string,
  hasSymbols: PropTypes.bool,
  symbolFill: PropTypes.string,
  setTooltip: PropTypes.func.isRequired,
};

Line.defaultProps = {
  data: [],
};

export default Line;
