import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import Component from './component';
import { loadStructure } from '../../ducks/data';
import { COUNTRY } from '../../api/sdmx';

export function componentDidMount() {
  this.props.loadStructure(COUNTRY, this.props.match.params.countryName);
}

export default compose(connect(null, { loadStructure }), lifecycle({ componentDidMount }))(
  Component,
);
