import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import Component from './component';
import { loadStructureAndData } from '../../ducks/data';
import { COUNTRY } from '../../api/sdmx';

export function componentDidMount() {
  this.props.loadStructureAndData(COUNTRY, this.props.match.params.countryName);
}

export default compose(connect(null, { loadStructureAndData }), lifecycle({ componentDidMount }))(
  Component,
);
