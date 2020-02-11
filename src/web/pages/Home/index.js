import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import Component from './component';
import { loadStructureAndData } from '../../ducks/data';
import { HOME } from '../../api/sdmx';

export function componentDidMount() {
  this.props.loadStructureAndData(HOME);
}

export default compose(connect(null, { loadStructureAndData }), lifecycle({ componentDidMount }))(
  Component,
);
