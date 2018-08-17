import { compose, lifecycle } from 'recompose';
import Component from './component';

export function componentDidMount() {
  // Analytics.trackEvent();
}

export default compose(lifecycle({ componentDidMount }))(Component);
