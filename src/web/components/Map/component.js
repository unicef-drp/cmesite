import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { compose, propOr, path, prop } from 'ramda';
import { select } from 'd3-selection';
import { geoPath } from 'd3-geo';
import { scaleThreshold } from 'd3-scale';
import { geoRobinson } from 'd3-geo-projection';
import { zoom, zoomTransform as d3ZoomTransform, zoomIdentity } from 'd3-zoom';
import { withSize } from 'react-sizeme';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import worldData from '../../../mock/map/world-geo-v11';
import Legend from './legend';
import Highlight from './highlight';
import { getColor, getDatapoint } from './utils';
import { INDICATOR_MAP_SCALES, INDICATOR, MAP_DEFAULT_SCALE } from '../../constants';

const style = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 3,
  },
  resetZoom: {
    position: 'absolute',
    top: theme.spacing.unit,
    right: theme.spacing.unit,
    textTransform: 'none',
  },
});

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
    const datapoints = propOr([], 'datapoints', mapSerie);
    const { mapOverColor } = theme.palette;
    const { domain, range, andAbove } = propOr(
      MAP_DEFAULT_SCALE,
      prop(`${INDICATOR}_ID`, mapSerie),
      INDICATOR_MAP_SCALES,
    );
    const scale = scaleThreshold()
      .domain(domain)
      .range(range);

    return (
      <div className={classes.root}>
        {/* div is required for withSize to work properly */}
        <Button variant="contained" onClick={this.resetZoom} className={classes.resetZoom}>
          <FormattedMessage {...messages.resetZoom} />
        </Button>
        <svg width={width} height={height} ref={el => (this.chartElement = el)}>
          <g>
            {worldData.features.map((d, i) => {
              const datapoint = getDatapoint({ d, datapoints });
              const color = getColor({ scale, datapoint });
              return (
                <path
                  key={`path-${i}`}
                  d={this.state.path(d)}
                  fill={color}
                  stroke={theme.palette.secondary.main}
                  strokeWidth={0.2}
                  onClick={() => {
                    if (!datapoint) return;
                    this.props.handleMapClick(datapoint);
                  }}
                  onMouseOver={event => {
                    select(event.target).attr('fill', mapOverColor);
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
        <Legend scale={scale} andAbove={andAbove} />
        <Highlight datapoint={this.state.datapoint} />
      </div>
    );
  }
}

WorldMap.propTypes = {
  size: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  mapSerie: PropTypes.object,
  handleMapClick: PropTypes.func.isRequired,
};

export default compose(withStyles(style, { withTheme: true }), withSize())(WorldMap);
