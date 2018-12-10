import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import Component from './component';
import { loadStructure } from '../../ducks/data';
import { HOME } from '../../api/sdmx';

export function componentDidMount() {
  this.props.loadStructure(HOME);
}

export default compose(connect(null, { loadStructure }), lifecycle({ componentDidMount }))(
  Component,
);
