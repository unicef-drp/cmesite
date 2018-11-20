import React from 'react';
import numeral from 'numeral';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { prop, isNil, always, ifElse, compose, propOr } from 'ramda';
import { select } from 'd3-selection';
import { geoPath } from 'd3-geo';
import { geoRobinson } from 'd3-geo-projection';
import { zoom, zoomTransform as d3ZoomTransform, zoomIdentity } from 'd3-zoom';
import { withSize } from 'react-sizeme';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import worldData from '../../../mock/map/world-geo';
import Legend from './legend';
import { getColor, getDatapoint } from './utils';
import { REF_AREA } from '../../constants';

const style = theme => ({
  resetZoom: {
    position: 'absolute',
    top: theme.spacing.unit,
    right: theme.spacing.unit,
    textTransform: 'none',
  },
  datapoint: {
    position: 'absolute',
    top: theme.spacing.unit,
    right: '50%',
    textTransform: 'none',
  },
});

const format = ifElse(isNil, always(null), n => numeral(n).format('0.00'));

class WorldMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      path: null,
      datapoint: null,
      zoomTransform: null,
    };

    this.zoom = zoom()
      .scaleExtent([1, 4])
      .on('zoom', this.zoomed.bind(this));
  }

  componentDidMount = () => select(this.chartElement).call(this.zoom);

  componentDidUpdate = () => select(this.chartElement).call(this.zoom);

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { width } = nextProps.size;
    const height = width / 1.77;

    const projection = geoRobinson()
      .scale(width / 1.8 / Math.PI)
      .translate([width / 2, height / 1.8]);

    const path = geoPath().projection(projection);

    return { ...prevState, path };
  };

  zoomed = () => {
    select(this.chartElement)
      .select('g')
      .attr('transform', d3ZoomTransform(this.chartElement));
  };

  resetZoom = () => {
    select(this.chartElement)
      .transition()
      .duration(750)
      .call(this.zoom.transform, zoomIdentity);
  };

  setDatapoint = datapoint => this.setState({ datapoint });

  render() {
    const { theme, size, mapSerie, classes } = this.props;
    const { width } = size;
    const height = width / 1.77;
    const { path } = this.state;
    const datapoints = propOr([], 'datapoints', mapSerie);
    const { mapAboveColor, mapNoneColor, mapColorScale } = theme.palette;

    return (
      <div>
        {/* div is required for withSize to work properly */}
        <Button variant="contained" onClick={this.resetZoom} className={classes.resetZoom}>
          <FormattedMessage {...messages.resetZoom} />
        </Button>
        {this.state.datapoint && (
          <Button variant="contained" color="primary" className={classes.datapoint}>
            <Typography variant="body2" color="primary">
              {path([REF_AREA, 'valueName'], this.state.datapoint)}
            </Typography>:
            <Typography variant="body2">
              {format(prop('y0', this.state.datapoint))}{' '}
              <strong>{format(prop('y', this.state.datapoint))}</strong>{' '}
              {format(prop('y1', this.state.datapoint))}
            </Typography>
            <Typography variant="caption">
              <FormattedMessage {...messages.resetZoom} />
            </Typography>
          </Button>
        )}
        <svg width={width} height={height} ref={el => (this.chartElement = el)}>
          <g>
            {worldData.features.map((d, i) => {
              const datapoint = getDatapoint({ d, datapoints });
              const color = getColor({ scale: mapColorScale, datapoint, noneColor: mapNoneColor });
              return (
                <path
                  key={`path-${i}`}
                  d={path(d)}
                  fill={color}
                  stroke={theme.palette.secondary.main}
                  strokeWidth={0.2}
                  onMouseOver={event => {
                    select(event.target).attr('fill', theme.palette.primary.main);
                    this.setDatapoint(datapoint);
                  }}
                  onMouseOut={event => {
                    select(event.target).attr('fill', color);
                    this.setDatapoint();
                  }}
                />
              );
            })}
          </g>
        </svg>
        <Legend scale={mapColorScale} colors={{ none: mapNoneColor, above: mapAboveColor }} />
      </div>
    );
  }
}

export default compose(withStyles(style, { withTheme: true }), withSize())(WorldMap);
