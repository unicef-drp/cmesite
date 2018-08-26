import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import Component from './component';
import { loadStructure } from '../../ducks/data';

export function componentDidMount() {
  // Analytics.trackEvent();
  this.props.loadStructure();
}

export const enhance = compose(
  connect(null, { loadStructure }),
  lifecycle({ componentDidMount }),
);

export default enhance(Component);
