import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import Component from './component';
import { loadStructure } from '../../ducks/data';
import { MAP } from '../../api/sdmx';

export function componentDidMount() {
  this.props.loadStructure(MAP);
}

export default compose(connect(null, { loadStructure }), lifecycle({ componentDidMount }))(
  Component,
);
